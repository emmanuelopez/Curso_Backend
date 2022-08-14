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
export async function obtenerCarritos(req, res) {
    logger.info(`GET api/shoppingcartproducts`);
    try {
        const carritos = await listarCarritos();
        res.status(201).json(carritos);
    } catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

//devuelve todos los productos de un carrito
export async function obtenerCarrito(req, res) {
    logger.info(`GET api/shoppingcartproducts/idShoppingCart`);
    try {
        const idCarrito = req.params.idCart;
        const carrito = await listarCarritoPorId(idCarrito);
        if (carrito) {
            res.status(201).json(carrito.productos); 
        } else res.status(400).send('No existe el carrito con el id: ' + idCarrito);   
    } catch (error) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

//crea un carrito y devuelve el id asignado
export async function generarCarrito(req, res) {
    logger.info(`POST api/shoppingcartproducts`);
    try {
        const objProductosCarrito = {...req.body};
        const objCarritoNuevo = await crearCarrito(objProductosCarrito);
        if (objCarritoNuevo) {
            res.status(201).json(objCarritoNuevo);
        } else res.status(400).send('No se pudo crear el carrito');
        
    } catch (error) {
        logger.error(err);
        res.status(err.estado).json(err);
    }       
}

//recibe y agrega un producto al carrito indicado x el body
export async function agregarProductoCarrito(req, res) {
    logger.info(`POST api/shoppingcartproducts/idShoppingCart`);
    try {
        const idCarrito = req.params.idCart;
        const objProducto = {...req.body};
        const productoAgregado = await agregarProducto(idCarrito, objProducto)
        if (productoAgregado) {
            res.status(201).json("Se agrego producto");
        } else res.status(400).send('No se pudo agregar el producto al carrito');
    } catch (error) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

export async function borrarProductoCarrito(req, res) {
    logger.info(`GET api/shoppingcartproducts/idShoppingCart/idProduct`);
    try {
        const idCarrito = req.params.idCart;
        const idProducto = req.params.idProduct;
        const resultado = await quitarProducto(idCarrito, idProducto);
        if (resultado) {
            res.status(201).json("Se quito producto del carrito");
        } else res.status(400).send('No se pudo borrar el producto');
    } catch (error) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

export async function borrarCarrito(req, res) {
    logger.info(`GET api/shoppingcartproducts/idShoppingCart`);
    try {
        const idCarrito = req.params.idCart;
        const resultado = await eliminarCarrito(idCarrito);
        if (resultado) {
            res.status(201).json({msg: 'Carrito borrado'});
        } else res.status(400).send('No se pudo borrar el carrito');
    } catch (error) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}