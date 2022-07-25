const mongoose = require("mongoose")
const config = require("./config/config")


try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //console.log("Base de datos online");
} catch (error) {
  console.log(error);
  throw new Error("Error en iniciar la base de datos");
}
