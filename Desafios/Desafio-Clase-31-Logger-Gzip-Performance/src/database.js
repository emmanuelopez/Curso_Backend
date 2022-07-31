const mongoose = require("mongoose")
const logger = require("./logger");

const dbConnection = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Base de datos online");
  } catch (error) {
    logger.error(error);
    throw new Error("Error en iniciar la base de datos");
  }
}

module.exports = dbConnection 