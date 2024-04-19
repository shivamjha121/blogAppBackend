import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  //google login
passport.use(new GoogleStrategy({
    clientID: "968594264292-rcmkvuf3q9euea4fc0b6f93q8nm2u5si.apps.googleusercontent.com",
    clientSecret: "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",
  //   callbackURL: "https://www.shivamjha2001.com/auth/google/callback",
    callbackURL: "http://localhost:8000/auth/google/callback",
  //   passReqToCallback: true
  
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    // console.log(accessToken, refreshToken)
    return cb(null, profile);
  }
  ));
  

  export default passport