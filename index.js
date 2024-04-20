import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './db.js';
import signupController from './controllers/signup.controller.js';
import loginController from './controllers/login.controller.js';
import passport from 'passport';
import './passport.js'
import session from 'express-session';
import addPosts from './controllers/addPosts.controller.js';
import getAllPosts from './controllers/getAllPosts.controller.js';
import userPost from './controllers/getUserPosts.controller.js';
import editPost from './controllers/editPost.controller.js';
import {addBookmarks,getBookmarks} from './controllers/addBookmarks.contoller.js';
import sendFilterData from './controllers/sendFilterData.controller.js';
connectDB();
const app =express();

app.use(cors());
app.use(express.json());

const PORT=8000;

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

app.get('/',(req,res)=>{
    const data=req.query.data;
    console.log(data);
 if(data){
    res.send(data);
 }else{
    res.send("no data");
 }
})

app.post('/signup',signupController);

app.post('/login',loginController);

//google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home
    // console.log(req.user)
    res.redirect( `http://localhost:8000?data=${JSON.stringify(req.user)}`);
  });


  //posts

  app.post('/addPosts', addPosts);
  app.get('/getAllPosts',getAllPosts );
  app.get('/userPost/:userId',userPost);
  app.get('/editPost',editPost);


//bookmarks
app.post('/addBookmarks',addBookmarks);
app.get('/getBookmarks/:userId',getBookmarks);


//filter
app.post('/sendFilterData/:catagory',sendFilterData);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})