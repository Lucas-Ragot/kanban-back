require('dotenv').config();

const express = require('express');
const multer  = require('multer');
const upload = multer();
const cors = require('cors');
const router = require('./app/router');

const app = express();
const PORT = process.env.PORT || 3000;

/* 
  Par défaut mon API ne pourra être consommé que depuis le domaine sur lequel elle est servi
  Si je veux autoriser d'autres domaines je spécifie ma politique de CORS (Cross Origin Ressource Sharing)
  Pour cela on renvoie des entete dans nos réponse du type
  Access-Control-Allow-Origin: http://okanban.fr
  Par exemple ici okanban.fr pourra intérroger mon API
  Avec le package CORS c'est exactement ce qu'il se passe
  Ici sans option ça revient à dire Access-Control-Allow-Origin: *
  Toutes les origines peuvent interroger mon API
*/
app.use(cors());

// je parse le format urlencoded du corps de la requete pour alimenter req.body
app.use(express.urlencoded({ extended:true }));
// je parse le format json du corps de la requete pour alimenter req.body
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listen on http://localhost:${PORT}`);
});
