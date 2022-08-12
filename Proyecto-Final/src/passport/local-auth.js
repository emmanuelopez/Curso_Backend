import passport from 'passport'
import { Strategy } from 'passport-local'
import logger from '../logger.js'
import {
  existeUsername,
  crearUsuario,
  login
} from '../services/usuariosService.js'


passport.use('registro', new Strategy({
  passReqToCallback: true
  },
  async (req, username, password, done) => {
    logger.info(`local-auth.js - passport.use --> registro`)
    //const { email } = req.body
    const user = await existeUsername(username);
    if (user) {
      return done(null, false)
    } 
    const newUser = req.body
    await crearUsuario(newUser);
    console.log("CONTROL!!!");
    done(null, newUser);
  }
));
      
passport.use('login', new Strategy(
  async (username, password, done) => {
    logger.info(`local-auth.js - passport.use --> login`)
    const user = await login(username, password);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  logger.info(`local-auth.js - passport.serializeUser`)
  done(null, user.username);
});
        
passport.deserializeUser(async (username, done) => {
  logger.info(`local-auth.js - passport.deserializeUser`)
  const user = await existeUsername(username);
  done(null, user);
});


export default passport
