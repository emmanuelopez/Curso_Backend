import { Router } from 'express'
import { isAuth } from './auth.js'

import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/home', isAuth, (req, res) => {
    // res.sendFile(path.join(process.cwd(), '/views/home.html'))
    res.render(path.join(process.cwd(), '/views/pages/home.ejs')/*, { email: req.session.email }*/)
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})

export default productosWebRouter