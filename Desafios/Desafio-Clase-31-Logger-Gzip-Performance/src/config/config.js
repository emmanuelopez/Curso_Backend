const dotenv = require("dotenv");
const parseArgs = require ("minimist");


const options= {default:{port:8080},alias:{p:"port", m:"modo"}};
const puerto = parseArgs(process.argv,options).port;
const modo = parseArgs(process.argv,options).modo;
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  //PORT: process.env.PORT || 8080,
  PORT: puerto,
  MODO: modo,
  MONGO_URL: process.env.MONGO_URL||'noURL',
  MONGO_DB: process.env.MONGO_BASE||'ecommerce',
  MONGO_SESSION_URL: process.env.SESSION_URL||'noURL',
  SESSION_MAXAGE: process.env.SESSION_MAXAGE || 600000,
  SECRET:process.env.SECRET || 'Thebestteam9',
  TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA|| 'Mongo' ,
}