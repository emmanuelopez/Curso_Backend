const express = require("express");
const handlebars = require('express-handlebars');
const config = require("./config/config")
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const logger = require("./logger")
const cluster = require("cluster");
const os = require("os");
const dbConnection = require("./database")

const PORT = config.PORT;
const modo = config.MODO;

// initializations
const app = express();
require("./passport/local-auth");

// settings
//app.set("port", process.env.PORT || PORT);
app.set('views', (path.join(__dirname, 'views')))
app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //es para recibir los datos de un formulario
app.use(session({
  secret: "mysecretsession",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
})
);

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static('public'))

//rutas
app.use("/", require("./routes/index"));
app.use("/info", require("./routes/info"));
app.use("/infoComprimida", require("./routes/infoComprimida"));
app.use("/random", require("./routes/random"));
app.use("/randomComprimida", require("./routes/randomComprimida"));
app.use('/*', require("./routes/default"))

dbConnection()


if (modo === "CLUSTER") {

  const numCPUs = os.cpus().length

  if (cluster.isPrimary) {/* MASTER */
      console.log(`Cantidad de CPUS: ${numCPUs}`)
      console.log(`PID MASTER: ${process.pid}`)
      console.log(`MODO: ${modo}`)

      for (let i = 0; i < numCPUs; i++) {
          cluster.fork()
      }

      cluster.on('exit', worker => {
          console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
          cluster.fork()
      })
  } else { /* WORKERS */

      const server = app.listen(PORT, () => {
          logger.info(`Http server listening on port ${server.address().port} - PID WORKER ${process.pid}`)
      })
      
      server.on("error", error => logger.error(`Server error ${error}`))
  }

} else {

  const server = app.listen(PORT, () => {
      logger.info(`Http server listening on port ${server.address().port} - PID WORKER ${process.pid} - MODO ${modo}`)
  })
  
  server.on("error", error => logger.error(`Server error ${error}`))
}