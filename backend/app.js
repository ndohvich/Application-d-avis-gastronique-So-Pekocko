////////// contient de l'application //////////

//importations
require('dotenv').config(); //charge les variables d'environnement
const express = require('express'); //framework node.js
const mongoose = require('mongoose'); //facilite interactions avec DB MongoDB
const path = require('path'); //donne accès au chemin de notre système de fichier
const rateLimit = require('express-rate-limit'); //limite les requêtes par IP
const helmet = require('helmet'); //définit divers en-têtes HTTP sécurisées
const mongoSanitize = require('express-mongo-sanitize'); //protège des attaques par injection NoSQL(MongoDB)
const cors = require('cors'); //permet de protéger les en-têtes


//création de notre application express
const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

//connexion à bdd MongoDB via mongoose
mongoose.connect(`mongodb+srv://ndohvich:171191Yannickndohjules@cluster0.zxie4.mongodb.net/test`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//permet de protéger les en-têtes 
app.use(cors());

//rend le corps des requêtes json (de tt types) => en objet JS utilisable -- anciennement body-parser
app.use(express.json());

app.use(mongoSanitize());

//gestion des fichiers images
app.use('/images', express.static(path.join(__dirname, 'images')));

//importe les routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//enregistre les routeurs dans l'application
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

//exporte l'application
module.exports = app;