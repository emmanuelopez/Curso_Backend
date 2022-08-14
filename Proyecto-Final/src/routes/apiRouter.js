import { Router } from 'express'
import productosRouter from './productosRouter.js'
import carritosRouter from './carritosRouter.js'
import usuariosRouter from './usuariosRouter.js'


const apiRouter = Router()

apiRouter.use('/products', productosRouter) // productos disponibles en la pagina
apiRouter.use('/shoppingcartproducts', carritosRouter) // carritos de compra de los usuarios

export default apiRouter 