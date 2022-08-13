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

//Obtiene ruta de registro
export async function registro(req, res) {
    res.render('register');
}

//Registro fallido
export async function failRegister(req, res){
    logger.info(`usuariosController.js: failRegister`)
    res.send("Usuario ya registrado")
    res.render('register-error')
}

export async function successRegister(req, res){
    logger.info(`UsuariosController.js: successRegister`)
    res.status(201).json({msg: `Registration was successful`}) //201 crear
}

//Login fallido
export function failLogin(req, res){
    logger.info(`usuariosController.js: failLogin`)
    res.render('login-error')
}

//Registro exitoso, muestra los datos del usuario
export async function datos(req, res) {
    const user = req.user.username
    try {
      const datos = await existeUsername({username: user}).lean()
      logger.info("Se muestran los datos del usuario: ", user)
      res.render('datos', {
        datos: datos
      });
    } catch (error) {
      logger.error(error)
    }
}

//Para desloguear al usuario
export function logout(req, res){
    logger.info(`usuariosController.js: logout`)
    if (req.isAuthenticated()){
        req.logout()
    }
    res.status(200).json({msg: `El usuario ya se encuentra deslogueado.`})
}

//Dado un email por parametro borra el mismo de la coleccion
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
