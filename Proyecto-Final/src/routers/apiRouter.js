import { Router, json } from 'express'
import productosRouter from './productosRouter.js'
import carritosRouter from './carritosRouter.js'

const apiRouter = Router()

apiRouter.use(json())

apiRouter.use('/productos', productosRouter)
apiRouter.use('/carritos', carritosRouter)

export default apiRouter 