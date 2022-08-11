import express, { json, urlencoded } from 'express'
import passport from './passport/local-auth.js'
import config from './config/config.js'
import apiRouter from './routes/apiRouter.js'
import webRouter from './routes/webRouter.js'
import defaultRouter from './routes/defaultRouter.js'
import logger from './logger.js'


export function crearServidor() {
    
    const app = express()
    
    app.use(express.static('public'))
    app.use(json()) //mdw para extraer el json que viene en las peticiones
    app.use(urlencoded({ extended: true })) //mdw para poder extraer los datos que vienen en la url cuando se envia un formulario (el true para poder enviar objetos anidados)
    
    app.set('view engine', 'ejs') //Configuracion del motor de vistas 
    app.use(passport.initialize()) 


    // routes apiRestFull
    app.use('/', webRouter)
    app.use('/api', apiRouter)
    app.use('/*', defaultRouter)

    return app
}
