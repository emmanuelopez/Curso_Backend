import express from 'express'
import passport from './passport/local-auth.js'
import path from 'path'
import session from 'express-session'
import usuariosRouter from './routes/usuariosRouter.js'
import apiRouter from './routes/apiRouter.js'
import webRouter from './routes/webRouter.js'
import defaultRouter from './routes/defaultRouter.js'
import infoRouter from './routes/infoRouter.js'


export function crearServidor() {
    
    const app = express()
    const __dirname = path.resolve();
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true })); //es para recibir los datos de un formulario
    app.use(session({
        secret: "mysecretsession",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    }));
    
    app.use(passport.initialize()) 
    app.use(passport.session());

    // routes apiRestFull
    app.use('/', webRouter)
    app.use('/usuarios', usuariosRouter) // usuarios que realizan la compra de los productos
    app.use('/api', apiRouter)
    app.use('/info', infoRouter)
    app.use('/*', defaultRouter)

    return app
}
