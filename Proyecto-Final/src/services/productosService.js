import { crear } from '../models/producto.js'
import daoProductos from '../databases/productos/daoProductos.js'


export async function listarProductos() {
    return await daoProductos.getAll()
}

export async function listarProductoPorId(idProducto) {
    if (idProducto != undefined) {
        let producto = await daoProductos.getById(idProducto)
        return producto;
    }
    return null
}

export async function crearProducto(datos) {
    if (datos.name != undefined && 
        datos.description != undefined &&
        (datos.price != undefined && parseInt(datos.price) != NaN) &&
        (datos.stock != undefined && parseInt(datos.stock) != NaN) &&
        (datos.image != undefined && datos.image != "")) {
            const producto = crear(datos)
            await daoProductos.save(producto)
            return producto
    } else {
        return null;
    } 
}

export async function actualizarProducto(idProducto, objProducto) {
    if (datos.name != undefined && 
        datos.description != undefined &&
        (datos.price != undefined && parseInt(datos.price) != NaN) &&
        (datos.stock != undefined && parseInt(datos.stock) != NaN) &&
        (datos.image != undefined && datos.image != "") &&
        (idProducto != undefined)){
            let producto = await daoProductos.getById(idProducto)
            if (producto != undefined) {
                return await daoProductos.update(idProducto, objProducto)
            }
    }
    return null
}

export async function eliminarProducto(idProducto) {
    if (idProducto != undefined) {
        return await daoProductos.deleteById(idProducto)
    }
    return false
}