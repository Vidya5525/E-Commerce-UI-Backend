import Product from "../model/productModel.js";
import ErrorHandler from "../utility/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utility/apiFeatures.js";
import cloudinary from "cloudinary";

// Create Product -- ADMIN
export const createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (const image of images) {
        const result = await cloudinary.v2.uploader.upload(image, { folder: "products" });
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

// Get All Products
// export const getAllProducts = catchAsyncError(async (req, res) => {
//     const resultPerPage = 8;
//     const productCount = await Product.countDocuments();

//     const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter();

//     let products = await apiFeatures.query;
//     let filteredProductsCount = products.length;

//     apiFeatures.pagination(resultPerPage);
//     products = await apiFeatures.query;

//     res.status(200).json({
//         success: true,
//         products,
//         productCount,
//         resultPerPage,
//         filteredProductsCount,
//     });
// });


export const getAllProducts = catchAsyncError(async (req, res) => {
    try {
        const resultPerPage = 8;
        const productCount = await Product.countDocuments();

        // Initialize ApiFeatures with search and filter
        const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter();

        // Clone the query before executing it the first time
        let products = await apiFeatures.query.clone();
        const filteredProductsCount = products.length;

        // Apply pagination and clone the query again
        apiFeatures.pagination(resultPerPage);
        products = await apiFeatures.query.clone();

        res.status(200).json({
            success: true,
            products,
            productCount,
            resultPerPage,
            filteredProductsCount, // Correct count of filtered products
        });
    } catch (error) {
        console.error("Error in getAllProducts:", error);  // Log the error
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});


// export const getAllProducts = catchAsyncError(async (req, res) => {
//     const resultPerPage = 8;
//     const productCount = await Product.countDocuments();

//     const apiFeatures = new ApiFeatures(Product.find(), req.query)
//         .search()
//         .filter()
//         .pagination(resultPerPage);

//     // Execute the query once after all operations
//     const products = await apiFeatures.query;

//     res.status(200).json({
//         success: true,
//         products,
//         productCount,
//         resultPerPage,
//         filteredProductsCount: productCount,
//     });
// });






// Get All Products (Admin)
export const getAdminProducts = catchAsyncError(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details
export const getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});





// Update Product -- ADMIN
export const updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Handle Images
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
        images = req.body.images;
    }

    if (images.length) {
        // Deleting Images From Cloudinary
        for (const img of product.image) {
            await cloudinary.v2.uploader.destroy(img.public_id);
        }

        const imagesLinks = [];

        for (const image of images) {
            const result = await cloudinary.v2.uploader.upload(image, { folder: "products" });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete Product
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Deleting Images From Cloudinary
    for (const img of product.image) {
        await cloudinary.v2.uploader.destroy(img.public_id);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});

// Create or Update Product Review
export const createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const existingReview = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (existingReview) {
        product.reviews = product.reviews.map(rev => rev.user.toString() === req.user._id.toString() ? review : rev);
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get All Reviews of a Product
export const getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
export const deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    product.reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    product.ratings = product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / (product.reviews.length || 1);
    product.numOfReviews = product.reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews: product.reviews,
        ratings: product.ratings,
        numOfReviews: product.numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});
