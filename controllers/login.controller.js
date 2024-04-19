import mongoose from "mongoose";
import usersModel from "../models/users.model.js";
import { decrypt } from "../utils/bcrypt.js";


const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user=await usersModel.findOne({email});
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // res.json({ message: "Login successful" });
    else{
        const decryptPassword=await decrypt(password,user.password);
       if(decryptPassword===true){
        return res.status(200).json({ message: "Login successful" });
       }
       else{
        return res.status(400).json({ message: "Invalid credentials" });
       }
    }
}

export default loginController;