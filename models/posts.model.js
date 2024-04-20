import mongoose from "mongoose";


const postsData = new mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  posts:[
    {
    postId:mongoose.Schema.Types.ObjectId,
    title:{
      type: String,
      // required: true
    },
    description:{
      type: String,
      // required: true
    },
    date:{
      type: Date,
      default: Date.now
    },
    imageUrl:{
      type: String
    },
    catagory:{
      type: String
    },
    likes:{
      type: Number
    }
  }
]
});


export default mongoose.model("posts", postsData)