import { 
    crearProducto, 
    listarProductos, 
    listarProductoPorId, 
    actualizarProducto, 
    borrarProducto 
} from '../services/productosService.js'


export async function getAll(req, res, next) {
    try {
        const productos = await listarProductos()
        console.log(productos);
        res.status(201).json(productos)
    } catch (error) {
        next(error)
    }
}

export async function getById(req, res, next) {
    try {
        const idProducto = parseInt(req.params.idProducto);
        const producto = await listarProductoPorId(idProducto)
        if (producto) {
            console.log(producto);
            res.status(201).json(producto) 
        } else res.status(400).send('No existe el producto con el id: ' + idProducto)   
    } catch (error) {
        next(error)
    }
}

export async function post(req, res, next) {
    try {
        const nuevoProducto = await crearProducto(req.body)
        if (nuevoProducto) {
            console.log(nuevoProducto);
            res.status(201).json(nuevoProducto)
        } else res.status(400).send('No se pudo crear el producto')
        
    } catch (error) {
        next(error)
    }
}

export async function put(req, res, next) {
    try {
        const idProducto = parseInt(req.params.idProducto);
        const objProducto = {...req.body};
        const productoActualizado = await actualizarProducto(idProducto, objProducto)
        if (productoActualizado) {
            console.log(`El producto con id ${idProducto} se actualizo correctamente`);
            res.status(201).json(`El producto con id ${idProducto} se actualizo correctamente`)
        } else res.status(400).send('No se pudo actualizar el producto')
    } catch (error) {
        next(error)
    }
}

export async function deleteById(req, res, next) {
    try {
        const idProducto = parseInt(req.params.idProducto);
        const resultado = await borrarProducto(idProducto);
        if (resultado) {
            res.status(201).json({msg: 'Producto borrado'})
        } else res.status(400).send('No se pudo borrar el producto')
    } catch (error) {
        next(error)
    }
}
