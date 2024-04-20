import mongoose from "mongoose";



const bookMarksData=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postId:[Array]
})


export default mongoose.model("bookMarks",bookMarksData)