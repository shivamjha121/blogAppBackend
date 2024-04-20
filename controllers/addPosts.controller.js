import mongoose from "mongoose";

import PostsModel from "../models/posts.model.js"; // Assuming the model is named PostsModel

const addPosts = async (req, res) => {

  const { userId, title, description, imageUrl, catagory ,likes} = req.body;

  try {
    // Find the user's document
    const userPosts = await PostsModel.findOne({ userId });

    if (userPosts) {
      // User exists, push new post to existing array
      userPosts.posts.push({ title, description, imageUrl, catagory,likes });
      await userPosts.save();

      res.status(201).json({ message: "Post added successfully" });
    } else {
      // User doesn't exist, create new document with the post
      const newPost = new PostsModel({
        userId,
        posts: [{ title, description, imageUrl, catagory,likes}]
      });
      await newPost.save();

      res.status(201).json({ message: "Post created successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding post" });
  }
};

export default addPosts;
