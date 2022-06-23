import { Router } from 'express'
import * as productosController from '../controllers/productosController.js'

const productosRouter = Router()

productosRouter.get('/', productosController.getAll)
productosRouter.get('/:idProducto', productosController.getById)
productosRouter.post('/', productosController.post)
productosRouter.put('/:idProducto', productosController.put)
productosRouter.delete('/:idProducto', productosController.deleteById)

export default productosRouter 