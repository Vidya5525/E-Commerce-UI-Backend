// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Please enter product name"],
//         trim: true,
//     },
//     description: {
//         type: String,
//         required: [true, "Please enter product description"],
//     },
//     price: {
//         type: Number,
//         required: [true, "Please enter product price"],
//         max: [99999999, "Price cannot exceed 8 digits"], // Adjusted to a max value rather than maxLength
//     },
//     rating: {
//         type: Number,
//         default: 0,
//         min: [0, "Ratings cannot be less than 0"], // Optional validation for ratings
//         max: [5, "Ratings cannot exceed 5"], // Optional validation for ratings
//     },
//     image: [{
//         public_id: {
//             type: String,
//             required: true,
//         },
//         url: {
//             type: String,
//             required: true,
//         },
//     }],
//     category: {
//         type: String,
//         required: [true, "Please enter product category"],
//     },
//     stock: {
//         type: Number,
//         required: [true, "Please enter product stock"],
//         default: 1,
//         min: [0, "Stock cannot be less than 0"], // Optional validation for stock
//         max: [9999, "Stock cannot exceed 4 digits"], // Adjusted to a max value rather than maxLength
//     },
//     numOfReviews: {
//         type: Number,
//         default: 0,
//     },
//     reviews: [{
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//         },
//         name: {
//             type: String,
//             required: true,
//         },
//         ratings: {
//             type: Number,
//             required: true,
//         },
//         comment: {
//             type: String,
//             required: true,
//         },
//     }],
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Product = mongoose.model("Product", productSchema);
// export default Product;



import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        max: [99999999, "Price cannot exceed 8 digits"],
    },
    rating: {  // changed to singular "rating"
        type: Number,
        default: 0,
        min: [0, "Ratings cannot be less than 0"],
        max: [5, "Ratings cannot exceed 5"],
    },
    image: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }],
    category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        default: 1,
        min: [0, "Stock cannot be less than 0"],
        max: [9999, "Stock cannot exceed 4 digits"],
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: { // changed to singular "rating"
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
