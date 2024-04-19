import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './db.js';
import signupController from './controllers/signup.controller.js';
import loginController from './controllers/login.controller.js';
import passport from 'passport';
import './passport.js'
import session from 'express-session';
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
   res.json({message:"Hello World",user:JSON.parse(data)});
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



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})