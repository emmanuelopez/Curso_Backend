import { crear } from '../models/carrito.js'
import daoCarritos from '../databases/carritos/daoCarritos.js'


export async function listarCarritos() {
    return await daoCarritos.getAll()
}

export async function listarCarritoPorId(idCarrito) {
    if (idCarrito != undefined && typeof(idCarrito) === "number") {
        let carrito = await daoCarritos.getById(idCarrito)
        return carrito;
    }
    return null
}

//Creo el carrito y recibo como parametro uno de los productos anteriormente creados
export async function crearCarrito(objProducto) {
    const carrito = crear(objProducto)
    console.log(carrito);
    await daoCarritos.save(carrito)
    return carrito.id
}

export async function agregarProducto(idCarrito, objProducto) {
    if (objProducto.id != undefined && idCarrito != undefined) {
        let carrito = await daoCarritos.getById(idCarrito)
        if (carrito) {
            return await daoCarritos.add(idCarrito, objProducto)   
        }
    }
    return false
}

export async function quitarProducto(idCarrito, idProducto) {
    if (idCarrito != undefined && idProducto != undefined) {
        let carrito = await daoCarritos.getById(idCarrito)
        if (carrito) {
            return await daoCarritos.remove(idCarrito, idProducto)
        }
    } 
    return false
}

export async function eliminarCarrito(idCarrito) {
    if (idCarrito != undefined) {
        return await daoCarritos.deleteById(idCarrito)
    }
    return false
}