const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Base de datos MongoDB online");
  } catch (error) {
    console.error("Error al conectar a la base de datos");
  }
};

module.exports = { connectDB }