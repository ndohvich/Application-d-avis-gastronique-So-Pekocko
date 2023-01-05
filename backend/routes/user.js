////////// contient logique de routing pour user //////////

//importe Express
const express = require("express");

//création d'un routeur Express
const router = express.Router();

//importe la logique métier de sauce
const userCtrl = require("../controllers/user");
const passwordValidation = require("../middelware/passwordValidation");
const emailValidation = require("../middelware/emailValidation");

//routes disponibles dans l'application avec leur nom de fonction (avec une sémantique qui permet de savoir ce qu'elles font)
router.post("/signup", emailValidation, passwordValidation, userCtrl.signup);
router.post("/login", userCtrl.login);

//exporte le routeur Express
module.exports = router;