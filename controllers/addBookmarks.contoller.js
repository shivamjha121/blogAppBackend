import mongoose from "mongoose";
import bookMarksModel from "../models/bookMarks.model.js"


const addBookmarks = async (req, res) => {
    const userId = req.query.userId;
    const postId = req.query.postId;
    console.log(userId, postId)

  const userBookmarks = await bookMarksModel.findOne({ userId });
  if (userBookmarks) {
    // User exists, push new post to existing array
    userBookmarks.postId.push({ postId });
    await userBookmarks.save();
    res.status(201).json({ message: "Post added successfully" });
  } else {
    // User doesn't exist, create new document with the post
    const newPost = new bookMarksModel({
      userId,
      posts: [{ postId }],
    });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  }

}

const getBookmarks = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  const userBookmarks = await bookMarksModel.findOne({ userId });
  if (userBookmarks) {
    res.status(200).json(userBookmarks);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}



export {addBookmarks,getBookmarks}