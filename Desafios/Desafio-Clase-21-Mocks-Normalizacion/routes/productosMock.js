const express = require('express');
const router = express.Router();
const ContenedorMemoria = require('../contenedores/contenedorProductoRandom.js')

const apiProductos = new ContenedorMemoria()

router.get('/productos-test', async(req, res, next) => {
    try {
        res.json(await apiProductos.generar())
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    const erroresNoEncontrado = [
        'Error al listar: elemento no encontrado',
        'Error al actualizar: elemento no encontrado',
        'Error al borrar: elemento no encontrado'
    ]

    if (erroresNoEncontrado.includes(err.message)) {
        res.status(404)
    } else {
        res.status(500)
    }
    res.json({ message: err.message })
});

module.exports = router;