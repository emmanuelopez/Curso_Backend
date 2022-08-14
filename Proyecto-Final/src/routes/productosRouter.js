import { Router } from 'express'
import * as productosController from '../controllers/productosController.js'


const productosRouter = Router()

//GET '/' --> obtiene todos los productos
productosRouter.get('/', productosController.obtenerProductos)

//GET '/:id' --> obtiene un producto segun el id pasado por parametro
productosRouter.get('/:idProduct', productosController.obtenerUnProducto)

//POST '/' --> crea un nuevo producto
productosRouter.post('/', productosController.generarProducto)

//PUT '/:id' actualiza un producto con id pasado por parametro
productosRouter.put('/:idProduct', productosController.modificarProducto)

//DELETE '/:id' elimina un producto con id pasado por parametro
productosRouter.delete('/:idProduct', productosController.borrarProducto)

export default productosRouter 