//Application 

//Importer Express
const express = require('express');

//Méthode qui permet de crée une appli express
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log('Requete recue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

// Fonction utilisé pour toutes les différentes requetes
app.use((req, res, next) => {
    res.json({ message: 'La requete a bien été recu' });
    next();
});

app.use((req, res) => {
    console.log('La réponse evoyé avec succé');
});



//Exporter cette application
module.exports = app;