const router = require("express").Router();
const os = require("os");


router.get("", (req, res) => {
    const objeto = {
      carpeta_proyecto: process.cwd(),
      path_ejecucion: process.execPath,
      plataforma: process.platform,
      argumentos: process.argv.slice(2),
      version_node: process.version,
      process_id: process.pid,
      memoria_total: process.memoryUsage().rss,
      cantidad_cpus: os.cpus().length
    };
  
    console.log(objeto);
    res.status(200).json(objeto);
  });

  module.exports = router;