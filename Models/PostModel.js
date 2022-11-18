import mongoose from "mongoose";



const PostSchema = mongoose.Schema(
    {

         UserId : {type : String, required : true},
         firstname: String,
         desc :  String,
         likes : [],
         image : String,
       
   },
   {
      timestamps : true,
   }
);

const PostModel = mongoose.model('Posts',PostSchema);
export default PostModel;
