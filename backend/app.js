//Application 

//Importer Express
const express = require('express');

//Méthode qui permet de crée une appli express
const app = express();

//Importer dotenv
require('dotenv').config();


const User = require('./models/User');

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



//Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.post('/register', (req, res, next) => {
    User.create({
        ...req.body
    })
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});




//Exporter cette application
module.exports = app;