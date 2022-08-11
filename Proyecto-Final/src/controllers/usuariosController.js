//import passport from '../passport/local-auth.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../config/config.js'
import globals from 'globals'
import { 
    getUsuarios, 
    deleteUsuario
} from '../services/usuariosService.js'


//devuelve todos los usuarios de la coleccion
export async function getAll(req, res) {
    logger.info(`usuariosController.js: obtenerUsuarios`)
    try{
        const usuariosList = await getUsuarios()
        res.status(200).json(usuariosList)
    }
    catch (err){
        logger.warn(err)
        res.status(err.estado).json(`Error al buscar todos los usuarios: ${err}`)
    }
}

// //Crea un nuevo usuario
// export async function createUser() {
//     passport.authenticate('registro', {
//         successRedirect: '/api/usuarios/successRegister',
//         failureRedirect: '/api/usuarios/failRegister'
//     }) 
// } 
    
//Registro exitoso
export async function successRegister(req, res) {
    logger.info(`usuariosController.js: successRegister`)
    res.status(201).json({msg: `El registro se realizó correctamente`})
}

//Registro fallido
export async function failRegister(req, res){
    logger.info(`usuariosController.js: failRegister`)
    res.status(400).json({err: 'Error al registrarse un nuevo usuario'})
}

// //Login de usuario
// export async function loginUser() {
//     passport.authenticate('login', {
//         successRedirect: '/api/usuarios/successLogin',
//         failureRedirect: '/api/usuarios/failLogin'})
// }
    
//Login exitoso
export function successLogin(req, res){
    logger.info(`usuariosController.js: successLogin`)
    const token = jwt.sign({ user: req.user }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });
    res.status(200).json({msg: `Para poder acceder a las api privadas debe ingresar el token ${token}`})
}

//Login fallido
export function failLogin(req, res){
    logger.info(`usuariosController.js: failLogin`)
    res.status(401).json({err: 'Error al loguearse'})
}

//para desloguear al usuario
export function logout(req, res){
    logger.info(`usuariosController.js: logout`)
    if (req.isAuthenticated()){
        globals.emailUser = ""
        req.logout()
    }
    res.status(200).json({msg: `El usuario ya se encuentra deslogueado.`})
}

//dado un id por parametro borra el mismo de la coleccion
export async function borrarUsuario(req, res) {    
    let email = req.params.email;
    logger.info(`usuariosController.js: borrarUsuario --> ${email}`)
    try{
        await deleteUsuario(email)
        res.status(401).json({msg: `El usuario ${email} fue eliminado correctamente`})
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(`Error al borrar el usuario: ${err}`)
    }
}

export function validarToken(token, cb) {
    logger.info(`UsuariosController.js: validarToken`)
    if (token.exp < Math.floor(Date.now() / 1000)) {
        logger.warn('El token ha caducado, debe volver a loguearse para generar un nuevo token')
        return cb(null, false)
    }
    else return cb(null, token.user);
}

//Valido si el usuario es administrador
export function esAdministrador(req, res, next) {
    logger.info(`usuariosController.js: esAdministrador`)
    let administrador = false
    req.user.roles.forEach(element => {
        if (element == 'admin')
            administrador = true
    });

    if(administrador)
        next()
    else {
        logger.warn(`El usuario ${req.user.email} no tiene permisos de administrador y quizo acceder a una ruta no autorizada.`);
        res.status(401).json({ error: `Ruta no autorizada. El usuario ${req.user.email} no tiene permisos de administrador.` })
    }

}

export async function uploadFile(req, res) {    
    let image = "user_default.png"
    if (req.file !== undefined){
        image = req.file.filename
    }
    res.status(200).json({url: `public/uploads/users/${image}`})
}
