import postsModel from "../models/posts.model.js";


const userPost=async(req,res)=>{
    try{
        // console.log(req.params.userId)
        if(!req.params.userId){
            return res.status(400).json({message:"User id is required"});
        }
        const userPosts=await postsModel.find({userId:req.params.userId});
        res.status(200).json(userPosts);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
export default userPost