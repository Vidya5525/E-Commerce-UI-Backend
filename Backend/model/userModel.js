import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have at least 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be at least 8 characters long"],
        select: false, // Exclude password from query results by default
    },
    avatar: {
        public_id: {
            type: String,
            //required:true,
        },
        url: {
            type: String,
            //required:true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) {
        return next();
    }

    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE, // Use 'expiresIn' not 'expireIn'
    });
};

// Compare given password with the hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate a token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the expiration time for the reset token
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Return the plain token
    return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;
