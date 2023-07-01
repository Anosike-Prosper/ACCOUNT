
const passport = require('passport')
const {userModel} = require('../models/user')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// import config from "../config/config";






const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:'our secret', // Replace with your secret key
};


passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userModel.findById(payload.id); // Replace with your user retrieval logic
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}))

const  verifyUser=(req, res, next)=> {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
    
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    req.user = user;
    next();
  })(req, res, next);
}


module.exports ={verifyUser}
