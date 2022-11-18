import express, { response }  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";  
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js"
import cors from "cors";
import UploadRoute from "./Routes/UploadRoute.js"
import cloudinary from "./utill/cloudinary.js";

const app = express();

app.use(express.static('public'))
app.use('/images',express.static("images"))

app.use(bodyParser.json({limit:'30mb',extended:true}))

app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors());
dotenv.config();

 const port = process.env.PORT
app.listen(port,()=>{
    console.log(`connected to ${process.env.PORT}`);
})

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
   
}).catch((e)=>console.log(e));

app.use('/api/upload/image', async(req,res)=>{
    
    try {
            const fileStr = req.body.data;
            const uploadResponce = await cloudinary.uploader.upload(fileStr,{
                upload_preset:'Social_media'
            })
            
            console.log(uploadResponce.url);
            res.json({url:uploadResponce.url});
            
        } catch (error) {
            res.status(400).send("not good");
        }


})
app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
