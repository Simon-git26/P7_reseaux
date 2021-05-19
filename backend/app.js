//Application 

//Importer Express
const express = require('express');

//Méthode qui permet de crée une appli express
const app = express();

//Importer dotenv
require('dotenv').config();

//Importer Mysql
const mysql = require('mysql2');

//Importer le router
const routerRoutes = require('./routes/router');


//------------------------Connection mysql bdd=projet7-------------------------
//Connection mysql
const bdd = mysql.createConnection({
    database: process.env.BDD_PROJET,
    host: process.env.HOST_LOCAL,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD_USER
});

bdd.connect(function(err) {
    if (err) throw err;
    console.log('Connecté à la base de données mySQL')
});



//Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_APP_URL);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// app.use('http://localhost:8080', routerRoutes);

//Exporter cette application
module.exports = app;