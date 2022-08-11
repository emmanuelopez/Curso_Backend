import { 
    listarProductos, 
    listarProductoPorId, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
} from '../services/productosService.js'


export async function obtenerProductos(req, res, next) {
    logger.info(`productosController.js: obtener todos los productos`)
    try {
        const productos = await listarProductos()
        res.status(201).json(productos)
    } 
    catch (error) {
        next(error)
    }
}

export async function obtenerUnProducto(req, res, next) {
    try {
        const idProducto = req.params.idProducto;
        const producto = await listarProductoPorId(idProducto)
        if (producto) {
            res.status(201).json(producto) 
        } else res.status(400).send('No existe el producto con el id: ' + idProducto)   
    } 
    catch (error) {
        console.log("hola");
        next(error)
    }
}

export async function generarProducto(req, res, next) {
    try {
        const nuevoProducto = await crearProducto(req.body)
        if (nuevoProducto) {
            res.status(201).json(nuevoProducto)
        } else res.status(400).send('No se pudo crear el producto')
        
    } catch (error) {
        next(error)
    }
}

export async function modificarProducto(req, res, next) {
    try {
        const idProducto = req.params.idProducto;
        const objProducto = {...req.body};
        const productoActualizado = await actualizarProducto(idProducto, objProducto)
        if (productoActualizado) {
            res.status(201).json(`El producto con id ${idProducto} se actualizo correctamente`)
        } else res.status(400).send('No se pudo actualizar el producto')
    } 
    catch (error) {
        next(error)
    }
}

export async function borrarProducto(req, res, next) {
    try {
        const idProducto = req.params.idProducto;
        const resultado = await eliminarProducto(idProducto);
        if (resultado) {
            res.status(201).json({msg: 'Producto borrado'})
        } else res.status(400).send('No se pudo borrar el producto')
    } 
    catch (error) {
        next(error)
    }
}
