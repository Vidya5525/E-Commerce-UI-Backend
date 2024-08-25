import mongoose from "mongoose";

const  connectDatabase = ()=>{
     mongoose.connect(process.env.DB_URI,) 
     .then((data)=>{
               console.log(`MongoDB connected with server : ${data.connection.host}`)})
     .catch((err)=>{console.log(err)});
}

export default connectDatabase;




// {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}


