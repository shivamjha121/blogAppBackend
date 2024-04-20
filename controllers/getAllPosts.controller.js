import mongoose from "mongoose";
import postsModel from "../models/posts.model.js";


const getAllPosts = async (req, res) => {
    try {
        const posts = await postsModel.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default getAllPosts