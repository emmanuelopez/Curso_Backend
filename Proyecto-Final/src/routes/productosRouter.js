import { Router } from 'express'
import * as productosController from '../controllers/productosController.js'


const productosRouter = Router()

//GET '/' --> obtiene todos los productos
productosRouter.get('/', productosController.obtenerProductos)

//GET '/:id' --> obtiene un producto segun el id pasado por parametro
productosRouter.get('/:idProducto', productosController.obtenerUnProducto)

//POST '/' --> crea un nuevo producto
productosRouter.post('/', productosController.generarProducto)

//PUT '/:id' actualiza un producto con id pasado por parametro
productosRouter.put('/:idProducto', productosController.modificarProducto)

//DELETE '/:id' elimina un producto con id pasado por parametro
productosRouter.delete('/:idProducto', productosController.borrarProducto)

export default productosRouter 