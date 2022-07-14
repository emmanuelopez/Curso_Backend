const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");


passport.use('register', new LocalStrategy({
  passReqToCallback: true
  },
  async (req, username, password, done) => {
    const { email } = req.body
    const user = await User.findOne({ username: username });
    if (user) {
      return done("Usuario ya registrado")
    } 
    const newUser = new User();
    newUser.username = username;
    newUser.password = newUser.encryptPassword(password);
    newUser.email = email;
    console.log(newUser);
    await newUser.save();
    done(null, newUser);
    }
  )
);
      
passport.use('login', new LocalStrategy(
  async (username, password, done) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      if (!user.comparePassword(password)) {
        return done(null, false)
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});
        
passport.deserializeUser(async (username, done) => {
  const user = await User.findOne({ username: username });
  done(null, user);
});
