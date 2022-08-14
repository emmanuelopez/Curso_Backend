import { Router } from 'express'
import * as carritosController from '../controllers/carritosController.js'


const carritosRouter = Router()

//GET '/' --> obtiene todos los carritos
carritosRouter.get('/', carritosController.obtenerCarritos)

//GET '/:id' --> obtiene los productos de un carrito con id pasado por parametro
carritosRouter.get('/:idCart', carritosController.obtenerCarrito)

//POST '/' --> crea un nuevo carrito
carritosRouter.post('/', carritosController.generarCarrito)

//POST '/' --> agrega un nuevo producto a un carrito con id pasado por parametro
carritosRouter.post('/:idCart', carritosController.agregarProductoCarrito)

//DELETE '/:id' elimina un producto de un carrito con id pasado por parametro
carritosRouter.delete('/:idCart/:idProduct', carritosController.borrarProductoCarrito)

//DELETE '/:id' elimina un carrito con id pasado por parametro
carritosRouter.delete('/:idCart', carritosController.borrarCarrito)

export default carritosRouter