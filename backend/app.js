//Application 

//Importer Express
const express = require('express');

//Méthode qui permet de crée une appli express
const app = express();


//Importer Mysql
const mysql = require('mysql2');


//------------------------Connection mysql bdd=projet7-------------------------
//Connection mysql
const bdd = mysql.createConnection({
    database: process.env.BDD,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD
});

bdd.connect(function(err) {
    if (err) throw err;
    console.log('Connecté à la base de données mySQL')
});



//Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



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