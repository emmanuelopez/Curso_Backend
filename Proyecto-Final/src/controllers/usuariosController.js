//import passport from '../passport/local-auth.js'
import logger from '../logger.js'
import path from 'path'
import { 
    getUsuarios, 
    deleteUsuario
} from '../services/usuariosService.js'


//Devuelve todos los usuarios de la coleccion
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

//Registro exitoso
export async function successRegister(req, res){
    logger.info(`POST User: successRegister`);
    res.status(201).json({ msg: `Registration was successful` });
}

//Registro fallido
export async function failRegister(req, res){
    logger.info(`POST User: failRegister`);
    try {
        res.status(403).json({ error: "The user is already registered" });
      } catch (error) {
        res.status(404).json(error);
      }
}

//Login exitoso
export async function successLogin (req, res) {
    logger.info(`POST User: successLogin`);
    res.json({ msg: "Success Login" });
  };

//Login fallido
export function failLogin(req, res){
    logger.info(`POST User: failLogin`);
    res.status(401).json({ error: "Credential error" });
}

//Para desloguear al usuario
export function logout(req, res){
    logger.info(`POST User: Logout`)
    if (req.isAuthenticated()){
        req.logout()
    }
    res.status(200).json({msg: `Success Logout`})
}

//Dado un email por parametro borra el mismo de la coleccion
export async function borrarUsuario(req, res) {    
    let email = req.params.email;
    logger.info(`usuariosController.js: borrarUsuario --> ${email}`)
    try{
        await deleteUsuario(email)
        res.status(201).json({msg: `El usuario ${email} fue eliminado correctamente`})
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(`Error al borrar el usuario: ${err}`)
    }
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
