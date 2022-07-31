const router = require("express").Router();
const { route } = require(".");
const logger = require("../logger");


function failRoute(req, res) {
    const title = 'ROUTING ERROR';
    const { url, method } = req
    logger.warn(`Route ${method} ${url} non-existent`)
    res.status(404).json( { titulo: title });
}

router.get('/*', failRoute);

router.post('/*', failRoute);

router.put('/*', failRoute);

router.delete('/*', failRoute);

module.exports = router;