////////// vérifie le format du mot de passe correspond au schema //////////


const passwordSchema = require("../models/Password");

//exporte le middleware
module.exports = (req, res, next) => {
    
    if (!passwordSchema.validate(req.body.password)) {
      res.status(401).json({
        error: new Error(`Le mot de passe doit contenir au moins 8 caractères, des minuscules et majuscules, deux chiffres, et pas d'espace !`)
      });
     
    } else {
      next();
    }
  };