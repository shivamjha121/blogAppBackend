import mongoose from "mongoose";



const URL='mongodb+srv://abhisekbansal000:shivam123@cluster0.ldcufbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
async function  connectDB(){
   try{
    await mongoose.connect(URL);
    console.log("database connected");
   }catch(err){
    console.log(err);
   }

}

export default connectDB