import ErrorHandler from "../utility/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";



export const isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{

    const {token} = req.cookies;

    if (!token){
        return next(new ErrorHandler("Please Login to Access this Resource",401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();


});


export const authorizeRoles = (...roles) =>{
    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Roles:${req.user.role} is not allowed to accses this resource`,403));
        }

        next();

    }
};

