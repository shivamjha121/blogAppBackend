import postsModel from "../models/posts.model.js";


const sendFilterData = async(req,res)=>{

try {
    const catagory=req.params.catagory
    // Find all user documents
    const allPosts = await postsModel.find({});
    // Filter posts based on category
    const filteredPosts = allPosts.reduce((acc, userPosts) => {
      const userPostsWithCategory = userPosts.posts.filter(post => post.catagory ===catagory );
      return acc.concat(userPostsWithCategory);
    }, []); // Initialize accumulator as an empty array
    if (filteredPosts.length > 0) {
      res.status(200).json(filteredPosts);
    } else {
      res.status(200).json({ message: "No posts found for this category" }); // Informative message
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error filtering posts" });
  }
}


export default sendFilterData