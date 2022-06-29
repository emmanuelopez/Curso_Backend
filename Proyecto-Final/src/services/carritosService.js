import { crear } from '../models/carritoModel.js'
import daoCarritos from '../databases/carritos/daoCarritos.js'
//import { LoggerLevel } from 'mongodb';
import { MODO_PERSISTENCIA } from '../config/config.js'


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

//Creo el carrito y recibo como parametro uno de los productos anteriormente creados
export async function crearCarrito(objProducto) {
    const carrito = await crear(objProducto)
    console.log(carrito);
    await daoCarritos.guardar(carrito)
    return carrito.id
}

export async function agregarProductoCarrito(idCarrito, objProducto) {
    if (objProducto.id != undefined && (idCarrito != undefined && typeof(idCarrito) === "number")) {
        console.log("validacion de datos OK")
        if (MODO_PERSISTENCIA != "mongodb" && MODO_PERSISTENCIA != "mysql") {
            //busco la posicion en el array del carrito a modificar
            let posicionCarrito = await daoCarritos.buscarPosCarrito(idCarrito)
            //si la posicion existe, el carrito existe y actualizo
            if (posicionCarrito > -1) {
                //valido si ya existe el producto
                let posicionProducto = await daoCarritos.buscarPosProducto(posicionCarrito, objProducto.id)
                if (posicionProducto > -1) { //existe, sumo cantidad en 1
                    console.log("El producto existe en el carrito, sumo cantidad en 1")
                    await daoCarritos.modificoCantidad(posicionCarrito, posicionProducto)
                } else { //no existe el producto, lo agrego
                    console.log("El producto no existe en el carrito, lo agrego")
                    await daoCarritos.agregar(objProducto, posicionCarrito)
                } 
                return true; // retorno OK la actualizacion del carrito
            }
        } else {
            let carrito = await daoCarritos.listarPorId(idCarrito)
            if (carrito) {
                return await daoCarritos.agregarProducto(idCarrito, objProducto)
            }
        }
    }
    return false
}

export async function borrarProductoCarrito(idCarrito, idProducto) {
    if ((idCarrito != undefined && typeof(idCarrito) === "number") && idProducto != undefined) {
        console.log("validacion de datos OK")
        if (MODO_PERSISTENCIA != "mongodb" && MODO_PERSISTENCIA != "mysql") {
            //busco la posicion en el array del carrito a modificar
            let posicionCarrito = await daoCarritos.buscarPosCarrito(idCarrito)
            //si la posicion existe, el carrito existe, y actualizo
            if (posicionCarrito > -1) {
                //valido si existe el producto
                let posicionProducto = await daoCarritos.buscarPosProducto(posicionCarrito, idProducto)  
                if (posicionProducto > -1) { //si existe, lo elimino
                    console.log("El producto existe en el carrito, lo elimino")
                    await daoCarritos.borrarProducto(posicionCarrito, posicionProducto)
                    return true
                }
            }
        } else {
            let carrito = await daoCarritos.listarPorId(idCarrito)
            if (carrito) {
                return await daoCarritos.quitarProducto(idCarrito, idProducto)
            }
        }
    } return false
}

export async function borrarCarrito(idCarrito) {
    if (idCarrito != undefined && typeof(idCarrito) === "number") {
        //obtengo la posicion en el arrayCarritos del id carrito ingresado como parametro
        if (MODO_PERSISTENCIA != "mongodb" && MODO_PERSISTENCIA != "mysql") {
            let posicionCarrito = await daoCarritos.buscarPosicion(idCarrito)
            if( posicionCarrito > -1){
                await daoCarritos.borrar(posicionCarrito)
                return true; // retorno OK la eliminacion
            }
        } else {
            return await daoCarritos.borrar(idCarrito)
        }
    }
    return false
}