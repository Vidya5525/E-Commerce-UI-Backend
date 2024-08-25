import ErrorHandler from "../utility/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../model/userModel.js";
import sendToken from "../utility/jwtToken.js";
import crypto from "crypto";
import cloudinary from "cloudinary";



// Register User
export const registerUser = catchAsyncError(async (req, res, next) => {
    console.log(req.body);
//     if (!req.files || Object.keys(req.files).length === 0) {
//            return next(new ErrorHandler("User Avatar Required!", 400));
//    }

//    const { avatar } = req.files;
//     const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
//     if (!allowedFormats.includes(avatar.mimetype)) {
//       return next(new ErrorHandler("File Format Not Supported!", 400));
//     }

//     const myCloud = await cloudinary.v2.uploader.upload(avatar.data, {
//         folder: "avatars",
//         width: 150,
//         crop: "scale",
//     });

//     if (!myCloud || myCloud.error) {
//             console.error(
//                "Cloudinary Error:",
//                myCloud.error || "Unknown Cloudinary error"
//              );
//              return next(new ErrorHandler("Failed To Upload User Avatar To Cloudinary", 500));
//     }

    const { name, email, password } = req.body;

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("User With This Email Already Exists!", 400));
    }

    const user = await User.create({
        name, email, password,
        // avatar: {
        //     public_id:myCloud.public_id,
        //     url:myCloud.secure_url,
        // }
    });

    sendToken(user, 201, res);
});

// Login User
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
export const logout = catchAsyncError(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Forgot Password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        message: `System Under-Process ${user.email}`,
    });
});


// Reset Password
export const resetPassword = catchAsyncError(async (req, res, next) => {
    // Create token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

// Get User Details
export const getUserDetails = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Password
export const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// Update User Profile
export const updateProfile = catchAsyncError(async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Get All Users (ADMIN)
export const getAllUsers = catchAsyncError(async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get Single User (ADMIN)
export const getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role -- Admin
export const updateUserRole = catchAsyncError(async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete User -- Admin
export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 400));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});
