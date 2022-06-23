import { 
    listarCarritos,
    listarCarritoPorId,
    crearCarrito,
    agregarProductoCarrito,
    borrarProductoCarrito,
    borrarCarrito
} from '../services/carritosService.js'


//devuelve todos los carritos
export async function getAllCarritos(req, res, next) {
    try {
        const carritos = await listarCarritos()
        console.log(carritos);
        res.status(201).json(carritos)
    } catch (error) {
        next(error)
    }
}

//devuelve todos los productos de un carrito
export async function getProductosCarrito(req, res, next) {
    try {
        const idCarrito = parseInt(req.params.idCarrito);
        const carrito = await listarCarritoPorId(idCarrito)
        if (carrito) {
            console.log(carrito);
            res.status(201).json(carrito) 
        } else res.status(400).send('No existe el carrito con el id: ' + idCarrito)   
    } catch (error) {
        next(error)
    }
}

//crea un carrito y devuelve el id asignado
export async function postCarrito(req, res, next) {
    try {
        const objProductosCarrito = {...req.body};
        const objCarritoNuevo = await crearCarrito(objProductosCarrito);
        if (objCarritoNuevo) {
            console.log(objCarritoNuevo);
            res.status(201).json(objCarritoNuevo)
        } else res.status(400).send('No se pudo crear el carrito')
        
    } catch (error) {
        next(error)
    }       
}

//recibe y agrega un producto al carrito indicado x el body
export async function postProductoCarrito(req, res, next) {
    try {
        const idCarrito = parseInt(req.params.idCarrito);
        const objProducto = {...req.body};
        const productoAgregado = await agregarProductoCarrito(idCarrito, objProducto)
        if (productoAgregado) {
            console.log(productoAgregado);
            res.status(201).json(productoAgregado)
        } else res.status(400).send('No se pudo agregar el producto al carrito')
    } catch (error) {
        next(error)
    }
}

export async function deleteProductoCarrito(req, res, next) {
    try {
        const idCarrito = parseInt(req.params.idCarrito)
        const idProducto = parseInt(req.params.idProducto);
        const resultado = await borrarProductoCarrito(idCarrito, idProducto);
        if (resultado) {
            res.status(201).json({msg: 'Producto borrado'})
        } else res.status(400).send('No se pudo borrar el producto')
    } catch (error) {
        next(error)
    }
}

export async function deleteCarrito(req, res, next) {
    try {
        const idCarrito = parseInt(req.params.idCarrito);
        const resultado = await borrarCarrito(idCarrito);
        if (resultado) {
            res.status(201).json({msg: 'Carrito borrado'})
        } else res.status(400).send('No se pudo borrar el carrito')
    } catch (error) {
        next(error)
    }
}