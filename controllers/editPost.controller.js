import postsModel from "../models/posts.model.js";

const editPost = async (req, res) => {
  const { userId, postId } = req.query;
  const updateData = req.body; // Object containing fields to update

  try {
    // Find the user document
    const user = await postsModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the post to update within the user's posts array
    const postToUpdate = user.posts.id(postId);

    if (!postToUpdate) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create an update object with only the provided fields
    const updatedFields = Object.keys(updateData); // Get field names from updateData
    const updateObject = updatedFields.reduce((acc, field) => {
      if (updateData[field] !== undefined) {
        acc[field] = updateData[field]; // Only include fields with values in updateData
      }
      return acc;
    }, {}); // Initialize accumulator as an empty object
    // console.log(user.posts.tit);

   
    // Apply selective update using $set operator
    user.posts.forEach((post) => {
      if (post._id.toString() === postId) {
        post.title = updateObject.title || post.title;
        post.description = updateObject.description || post.description;
        post.imageUrl = updateObject.imageUrl || post.imageUrl;
        post.catagory = updateObject.catagory || post.catagory;
        post.likes = updateObject.likes || post.likes;

        // Save the updated post
        user.save();
      }
    })
    // await user.updateOne({ "posts._id": postId }, { $set: updateObject });

    // No need to call save() here, as updateOne already saves the changes

    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating post" });
  }
};

export default editPost;
