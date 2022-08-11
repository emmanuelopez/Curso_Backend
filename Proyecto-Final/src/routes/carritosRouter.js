import { Router } from 'express'
import * as carritosController from '../controllers/carritosController.js'


const carritosRouter = Router()

//GET '/' --> obtiene todos los carritos
carritosRouter.get('/', carritosController.obtenerCarritos)

//GET '/:id' --> obtiene los productos de un carrito con id pasado por parametro
carritosRouter.get('/:idCarrito', carritosController.obtenerProductosCarrito)

//POST '/' --> crea un nuevo carrito
carritosRouter.post('/', carritosController.generarCarrito)

//POST '/' --> agrega un nuevo producto a un carrito con id pasado por parametro
carritosRouter.post('/:idCarrito/productos', carritosController.agregarProductoCarrito)

//DELETE '/:id' elimina un producto de un carrito con id pasado por parametro
carritosRouter.delete('/:idCarrito/productos/:idProducto', carritosController.borrarProductoCarrito)

//DELETE '/:id' elimina un carrito con id pasado por parametro
carritosRouter.delete('/:idCarrito', carritosController.borrarCarrito)

export default carritosRouter