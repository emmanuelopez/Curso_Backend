const express = require("express");
const handlebars = require('express-handlebars');
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan"); //es para ver las peticiones que el cliente nos presenta en la consola
const yargs = require("yargs/yargs")(process.argv.slice(2));
//const router = require("express").Router();
const User = require("./models/user");


dotenv.config()
const { puerto, _ } = yargs
  .boolean("debug")
  .alias({
    p: "puerto",
  })
  .default({
    puerto: 8080,
  }).argv;

// initializations
const app = express();
require("./database");
require("./passport/local-auth");

// settings
app.set("port", process.env.PORT || puerto);


// middlewares
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

app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');
app.set('views', (path.join(__dirname, 'views')))

app.use(express.json())
app.use(express.urlencoded({ extended: true })); //es para recibir los datos de un formulario
app.use(express.static('public'))

//rutas
app.use("/", require("./routes/index"));
app.use("/random", require("./routes/apiRandom"));

// Levanto puerto
app.listen(app.get("port"), () => {
  console.log("server en puerto ", app.get("port"));
});
