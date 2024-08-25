import app from './app.js';
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import connectDatabase from "./configuration/dataBase.js";



//config

dotenv.config({path:"Backend/configuration/config.env"});

connectDatabase();

//cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
});