////////// contient schéma de données d'un user //////////

//importations
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//schéma de données d'un user
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//pré-valide les informations avant de les enregistrer avec le plugin mongoose-unique-validator
userSchema.plugin(uniqueValidator);

//exporte le schéma
module.exports = mongoose.model("User", userSchema);