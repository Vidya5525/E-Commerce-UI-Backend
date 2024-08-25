import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import errorMiddleware from "./middleware/error.js";
//import path from "path";
import cors from 'cors';

// Middlewares
const corsOptions = {
    origin:"http://localhost:5173",
    method:["GET", "POST", "DELETE", "PUT"],
    Credential:true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());



// Router Imports
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";


// Use Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware for Error
app.use(errorMiddleware);

export default app;
