import passport from 'passport'
import { Strategy } from 'passport-local'
import { Strategy as JWTstrategy } from 'passport-jwt'
import logger from '../logger.js'
import { jwtOpts } from '../config/config.js'
import {validarToken} from '../controllers/usuariosController.js'
import {
  existeUsername,
  crearUsuario,
  login
} from '../services/usuariosService.js'


//Creacion de las estrategias de passport
passport.use('registro', new Strategy({passReqToCallback: true, usernameField: 'email'},
  async (req, username, password, done) => {
    logger.info(`local-auth.js - passport.use --> registro`)
    let usuario
    //valido si existe el usuario
    try{
      await existeUsername(username) //si encuentra usuario quiere decir q ya esta registrado
      return done(null, false) //false pq no se genero ningun cambio en el registro
    }
    catch(error){
      //todo OK, o sea no encontro el usuario
    }
    //si no existe lo creo
    try {
      const datosUsuario = req.body
      usuario = await crearUsuario(datosUsuario) //crear usuario
    }
    catch(error){
      return done(error) 
    }
    done(null, usuario)
  }
));
      
//estrategia para login
passport.use('login', new Strategy({usernameField: 'email'},
  async (email, password, done) => {
    logger.info(`local-auth.js - passport.use --> login`)
    globalThis.emailUser = email
    try{
      const user = await login(email, password)
      return done(null, user);
    }
    catch (error){
      logger.error(error);
      return done(null, false);
    }
}))

//informar de que manera va a manejar transformacion session-cookies
passport.serializeUser((user, done) => { //recibe usuario que esta en la sesion y callback
  logger.info(`local-auth.js - passport.serializeUser`)
  done(null, user);
  //done(null, user.email) // en el caso que mande user.email, cuando hago la deserealizacion tengo q buscar x email y obtener el objeto usuario completo
});

passport.deserializeUser((user, done) => {
  logger.info(`local-auth.js - passport.deserializeUser`)
  done(null, user);
});

passport.use('jwt', new JWTstrategy(jwtOpts, validarToken));

export default passport
