import { Router } from 'express'
import * as carritosController from '../controllers/carritosController.js'

const carritosRouter = Router()

carritosRouter.get('/', carritosController.getAllCarritos)
carritosRouter.get('/:idCarrito', carritosController.getProductosCarrito)
carritosRouter.post('/', carritosController.postCarrito)
carritosRouter.post('/:idCarrito/productos', carritosController.postProductoCarrito)
carritosRouter.delete('/:idCarrito/productos/:idProducto', carritosController.deleteProductoCarrito)
carritosRouter.delete('/:idCarrito', carritosController.deleteCarrito)

export default carritosRouter