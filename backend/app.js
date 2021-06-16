//Application 

//Importer Express
const express = require('express');

//Importer helmet
const helmet = require('helmet');

//Méthode qui permet de crée une appli express
const app = express();

//Helmet installer
app.use(helmet());

//Importer dotenv
require('dotenv').config();

const cors = require('cors');

const morgan = require('morgan');

//------------------------donne acces au chemin de notre systeme de fichier--------------------------
const path = require('path');

//Importer le router
const userRoutes = require('./routes/routeuser');


//Rate Limit
 /* const rateLimit = require('express-rate-limit');

const  apiLimiter  =  rateLimit ( { 
  windowMs : 15 * 60 * 1000 ,  // 15 minutes 
  max : 3 // nb dessaie 3
}); 

app.use("/login", apiLimiter); */


//Importer le fichier models et ajouter les modifs sur la table users
const db = require("./models");
db.sequelize.sync({ alter: true });

//Vérifier que la connection s'effectue
const verification = async function () {
    try {
        await db.sequelize.authenticate();
        console.log('Connecté !');
    } catch (error) {
        console.error('Problème: non connecté !', error);
    }
};

verification();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
//Porbleme de cors au cas ou
/* app.options('*', cors());*/

app.use(morgan('combined'));


//---------------------Dire a application de servir ce dossier images -------------------------
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', userRoutes);

//Exporter cette application
module.exports = app;