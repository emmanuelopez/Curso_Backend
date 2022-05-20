/*
export function webAuth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.redirect('/login')
    }
}
*/
import { obtenerUsuarioPorNombre } from '../persistencia/usuarios.js'

export function autenticar(nombre, password) {
    let usuario
    try {
        usuario = obtenerUsuarioPorNombre(nombre)
    } catch (error) {
        throw new Error('error en la autenticacion')
    }
    if (usuario.password !== password) {
        throw new Error('error en la autenticacion')
    }
}


export function requiereAutenticacion(req, res, next) {
    if (req.isAuthenticated) {
        next()
    } else {
        res.status(401).json({ msg: 'Este recurso requiere autenticacion' })
    }
}