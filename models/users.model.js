import mongoose from "mongoose";
import { Schema } from "mongoose";

const userData = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("users", userData);