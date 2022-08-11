import { 
    listarCarritos,
    listarCarritoPorId,
    crearCarrito,
    agregarProducto,
    quitarProducto,
    eliminarCarrito
} from '../services/carritosService.js'
import logger from '../logger.js'


//devuelve todos los carritos
export async function obtenerCarritos(req, res, next) {
    logger.info(`carritosController.js: obtener todos los carritos`)
    try {
        const carritos = await listarCarritos()
        res.status(201).json(carritos)
    } catch (error) {
        next(error)
    }
}

//devuelve todos los productos de un carrito
export async function obtenerProductosCarrito(req, res, next) {
    try {
        const idCarrito = req.params.idCarrito;
        const carrito = await listarCarritoPorId(idCarrito)
        if (carrito) {
            res.status(201).json(carrito.productos) 
        } else res.status(400).send('No existe el carrito con el id: ' + idCarrito)   
    } catch (error) {
        next(error)
    }
}

//crea un carrito y devuelve el id asignado
export async function generarCarrito(req, res, next) {
    try {
        const objProductosCarrito = {...req.body};
        const objCarritoNuevo = await crearCarrito(objProductosCarrito);
        if (objCarritoNuevo) {
            res.status(201).json(objCarritoNuevo)
        } else res.status(400).send('No se pudo crear el carrito')
        
    } catch (error) {
        next(error)
    }       
}

//recibe y agrega un producto al carrito indicado x el body
export async function agregarProductoCarrito(req, res, next) {
    try {
        const idCarrito = req.params.idCarrito;
        const objProducto = {...req.body};
        const productoAgregado = await agregarProducto(idCarrito, objProducto)
        if (productoAgregado) {
            res.status(201).json("Se agrego producto")
        } else res.status(400).send('No se pudo agregar el producto al carrito')
    } catch (error) {
        next(error)
    }
}

export async function borrarProductoCarrito(req, res, next) {
    try {
        const idCarrito = req.params.idCarrito;
        const idProducto = req.params.idProducto;
        const resultado = await quitarProducto(idCarrito, idProducto);
        if (resultado) {
            res.status(201).json("Se quito producto del carrito");
        } else res.status(400).send('No se pudo borrar el producto')
    } catch (error) {
        next(error)
    }
}

export async function borrarCarrito(req, res, next) {
    try {
        const idCarrito = req.params.idCarrito;
        const resultado = await eliminarCarrito(idCarrito);
        if (resultado) {
            res.status(201).json({msg: 'Carrito borrado'})
        } else res.status(400).send('No se pudo borrar el carrito')
    } catch (error) {
        next(error)
    }
}