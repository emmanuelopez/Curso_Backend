import express from 'express'
import { PORT } from './config/config.js'

import apiRouter from './routers/apiRouter.js'
import webRouter from './routers/webRouter.js'
import manejadorDeErrores from './middlewares/errores.js'

const app = express()

app.use('/', webRouter)
app.use('/api', apiRouter)
app.use(manejadorDeErrores)

app.listen(PORT, () => console.log('Servidor funcionando en puerto:', PORT));

// export async function conectar() {
//     return new Promise((resolve, reject) => {
//         server = app.listen(PORT, () => {
//             resolve()
//         })
//     })
// }

// export async function desconectar() {
//     return new Promise((resolve, reject) => {
//         server.close(() => {
//             resolve()
//         })
//     })
// }