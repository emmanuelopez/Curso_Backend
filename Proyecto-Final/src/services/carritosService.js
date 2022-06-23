import { crear } from '../models/productoModel.js'
import daoCarritos from '../databases/carritos/daoCarritos.js'


export async function listarCarritos() {
    return await daoCarritos.listarTodos()
}

export async function listarCarritoPorId(idCarrito) {
    if (idCarrito != undefined && typeof(idCarrito) === "number") {
        let carrito = await daoCarritos.listarPorId(idCarrito)
        return carrito;
    }
    return null
}

export async function crearCarrito(datos) {
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

export async function agregarProductoCarrito(idCarrito, objProducto) {
    if (objProducto.nombre != undefined && 
        objProducto.codigo != undefined && 
        objProducto.fechaHora != undefined && 
        objProducto.descripcion != undefined &&
        (objProducto.precio != undefined && parseInt(objProducto.precio) != NaN) && 
        (objProducto.stock != undefined && parseInt(objProducto.stock) != NaN) &&
        (objProducto.imagenURL != undefined && objProducto.imagenURL != "") &&
        (idCarrito != undefined && typeof(idCarrito) === "number")){
            let producto = await daoCarritos.listarPorId(idCarrito)
            if (producto != undefined) {
                return await daoCarritos.actualizar(idCarrito, objProducto)
            }
    }
    return null
}

export async function borrarProductoCarrito(idCarrito) {
    if (idCarrito != undefined && typeof(idCarrito) === "number") {
        let producto = await daoCarritos.listarPorId(idCarrito)
        if (producto != undefined) {
            return await daoCarritos.borrar(idCarrito)
        }
    }
    return false
}

export async function borrarCarrito(idCarrito) {
    if (idCarrito != undefined && typeof(idCarrito) === "number") {
        let carrito = await daoCarritos.listarPorId(idCarrito)
        if (carrito != undefined) {
            return await daoCarritos.borrar(idCarrito)
        }
    }
    return false
}