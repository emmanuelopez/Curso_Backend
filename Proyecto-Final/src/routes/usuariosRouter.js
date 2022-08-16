import { Router } from 'express'
import  * as usuariosController from '../controllers/usuariosController.js'
import { mdwValidateSchemaNewUsuario } from '../middlewares/usuariosMDW.js'
import passport from '../passport/local-auth.js'
import isAuth from '../middlewares/auth.js'


const usuariosRouter = new Router();

//GET '/' --> obtiene todos los usuarios
usuariosRouter.get('/', usuariosController.getAll);

//POST '/register' --> para dar de alta un nuevo usuario
usuariosRouter.post('/registro', mdwValidateSchemaNewUsuario, 
    passport.authenticate('registro', {
    failureRedirect: '/failRegister'}),
    usuariosController.successRegister
);

//GET '/failRegister' --> ruta registro fallido
usuariosRouter.get('/failRegister', usuariosController.failRegister);

//POST '/login' --> recibe email y password del usuario
usuariosRouter.post('/login', 
  passport.authenticate('login', {
    failureRedirect: '/failLogin'}),
    usuariosController.successLogin
);
    
//GET '/failLogin --> ruta de login fallido'
usuariosRouter.get('/failLogin', usuariosController.failLogin);

//GET '/successLogin --> ruta de login exitoso'
usuariosRouter.get('/successLogin', usuariosController.successLogin);

//GET '/logout' --> se desloguea
usuariosRouter.get('/logout', usuariosController.logout);

//DELETE '/:email' --> elimina un usuario segun el email pasado por parametro
usuariosRouter.delete('/bajaUsuario/:email', usuariosController.borrarUsuario);


export default usuariosRouter