import { crear } from '../models/productoModel.js'
import daoProductos from '../databases/productos/daoProductos.js'

export async function crearProducto(datos) {
    if (datos.nombre != undefined && 
        datos.codigo != undefined && 
        datos.fechaHora != undefined && 
        datos.descripcion != undefined &&
        (datos.precio != undefined && parseInt(datos.precio) != NaN) &&
        (datos.stock != undefined && parseInt(datos.stock) != NaN) &&
        (datos.imagenURL != undefined && datos.imagenURL != "")) {
            const producto = await crear(datos)
            await daoProductos.guardar(producto)
            return producto
    }else{
        return null;
    } 
}

export async function listarProductos() {
    return await daoProductos.listarTodos()
}

export async function listarProductoPorId(idProducto) {
    if (idProducto != undefined && typeof(idProducto) === "number") {
        let producto = await daoProductos.listarPorId(idProducto)
        return producto;
    }
    return null
}

export async function actualizarProducto(idProducto, objProducto) {
    if (objProducto.nombre != undefined && 
        objProducto.codigo != undefined && 
        objProducto.fechaHora != undefined && 
        objProducto.descripcion != undefined &&
        (objProducto.precio != undefined && parseInt(objProducto.precio) != NaN) && 
        (objProducto.stock != undefined && parseInt(objProducto.stock) != NaN) &&
        (objProducto.imagenURL != undefined && objProducto.imagenURL != "") &&
        (idProducto != undefined && typeof(idProducto) === "number")){
            let producto = await daoProductos.listarPorId(idProducto)
            if (producto != undefined) {
                return await daoProductos.actualizar(idProducto, objProducto)
            }
    }
    return null
}

export async function borrarProducto(idProducto) {
    if (idProducto != undefined && typeof(idProducto) === "number") {
        return await daoProductos.borrar(idProducto)
    }
    return false
}