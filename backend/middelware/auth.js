////////// protége les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes //////////

//importation
const jwt = require('jsonwebtoken'); //package pour créer et vérifier les tokens d'authentification

//exporte le middelware (appliqué avant les controllers des routes)
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //récupérartion du token après séparation du bearer
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // décode le token (génère un objet JS)
    const userId = decodedToken.userId; //extrait le userId de l'objetJS généré juste avant
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      next(); //si OK, poursuit avec une route de sauce
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    });
  }
};