import  { mongoose } from "mongoose"
import  bCrypt  from "bcrypt-nodejs" //encripta la contraseña

const { Schema, model } = mongoose

const userSchema = new Schema({
  email: String,
  password: String,
});
//encripta el password antes de guardarlo en la db
userSchema.methods.encryptPassword = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};
//compara el password con el encriptado de la db
userSchema.methods.comparePassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

export default model("User", userSchema);