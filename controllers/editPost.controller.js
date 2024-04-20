import postsModel from "../models/posts.model.js";


const editPost=async(req,res)=>{
const userId=req.query.userId
const postId=req.query.postId

const user=await postsModel.findOne({userId:userId})
const post=user.posts.findOneAndUpdate(post=>post._id==postId)
post.title=req.body.title;
post.description=req.body.description;
post.imageUrl=req.body.imageUrl;
post.catagory=req.body.catagory;
await user.save()
res.status(200).json({message:"Post updated successfully"})
}

export default editPost