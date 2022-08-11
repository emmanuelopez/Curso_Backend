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
    if (datos.nombre != undefined && 
        datos.codigo != undefined && 
        datos.fechaHora != undefined && 
        datos.descripcion != undefined &&
        (datos.precio != undefined && parseInt(datos.precio) != NaN) &&
        (datos.stock != undefined && parseInt(datos.stock) != NaN) &&
        (datos.imagenURL != undefined && datos.imagenURL != "")) {
            const producto = crear(datos)
            await daoProductos.save(producto)
            return producto
    } else {
        return null;
    } 
}

export async function actualizarProducto(idProducto, objProducto) {
    if (objProducto.nombre != undefined && 
        objProducto.codigo != undefined && 
        objProducto.fechaHora != undefined && 
        objProducto.descripcion != undefined &&
        (objProducto.precio != undefined && parseInt(objProducto.precio) != NaN) && 
        (objProducto.stock != undefined && parseInt(objProducto.stock) != NaN) &&
        (objProducto.imagenURL != undefined && objProducto.imagenURL != "") &&
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