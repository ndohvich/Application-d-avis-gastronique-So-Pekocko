////////// gestion des fichiers envoyés vers l'API //////////

//importe package multer
const multer = require("multer");

//dictionnaire pour créer l'extension du fichier à partir du MIMETYPE
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//créé un objet de configuration pour multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); //gestion des espaces dans le nom d'origine du fichier
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension); //créé le filename complet
  },
});

//exporte le middelware multer
module.exports = multer({ storage }).single("image");