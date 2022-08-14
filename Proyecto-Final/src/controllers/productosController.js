import logger from '../logger.js'
import { 
    listarProductos, 
    listarProductoPorId, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
} from '../services/productosService.js'


export async function obtenerProductos(req, res) {
    logger.info(`GET api/products`);
    try {
        const productos = await listarProductos();
        res.status(201).json(productos);
    } 
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

export async function obtenerUnProducto(req, res) {
    logger.info(`GET api/products/:idProduct`);
    try {
        const idProducto = req.params.idProduct;
        const producto = await listarProductoPorId(idProducto);
        if (producto) {
            res.status(201).json(producto);
        } else res.status(400).send('No existe el producto con el id: ' + idProducto);  
    } 
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

export async function generarProducto(req, res) {
    logger.info(`POST api/products`);
    try {
        const nuevoProducto = await crearProducto(req.body);
        if (nuevoProducto) {
            res.status(201).json(nuevoProducto);
        } else res.status(400).send('No se pudo crear el producto');
        
    } catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

export async function modificarProducto(req, res) {
    logger.info(`PUT api/products`);
    try {
        const idProducto = req.params.idProduct;
        const objProducto = {...req.body};
        const productoActualizado = await actualizarProducto(idProducto, objProducto);
        if (productoActualizado) {
            res.status(201).json(`El producto con id ${idProducto} se actualizo correctamente`);
        } else res.status(400).send('No se pudo actualizar el producto');
    } 
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

export async function borrarProducto(req, res) {
    logger.info(`DELETE api/products`);
    try {
        const idProducto = req.params.idProduct;
        const resultado = await eliminarProducto(idProducto);
        if (resultado) {
            res.status(201).json({msg: 'Producto borrado'});
        } else res.status(400).send('No se pudo borrar el producto');
    } 
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}
