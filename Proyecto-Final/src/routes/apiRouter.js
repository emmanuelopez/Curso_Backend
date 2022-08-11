import { Router } from 'express'
import productosRouter from './productosRouter.js'
import carritosRouter from './carritosRouter.js'
import usuariosRouter from './usuariosRouter.js'


const apiRouter = Router()

apiRouter.use('/usuarios', usuariosRouter) // usuarios que realizan la compra de los productos
apiRouter.use('/productos', productosRouter) // productos disponibles en la pagina
apiRouter.use('/carritos', carritosRouter) // carritos de compra de los usuarios

export default apiRouter 