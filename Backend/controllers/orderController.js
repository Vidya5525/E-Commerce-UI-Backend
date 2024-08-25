import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";
import ErrorHandler from "../utility/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// Create New Order
export const newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo, // Corrected variable name
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true, // Corrected spelling
        order,
    });
});

// Get Single Order
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email"); //populate for getting name email by user id


    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Get Logged In User's Orders
export const myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

// Get All Orders
export const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// Update Order Status -- ADMIN
export const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("This order has already been delivered", 400));
    }

    if (req.body.status === "Shipped") {
        for (const item of order.orderItems) {
            await updateStock(item.product, item.quantity);
        }
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    if (product) {
        product.stock -= quantity;
        await product.save({ validateBeforeSave: false });
    }
}

// Delete Order -- ADMIN
export const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    await order.remove(); // Ensure you await the removal operation

    res.status(200).json({
        success: true,
    });
});
