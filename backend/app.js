//Application 

//Importer Express
const express = require('express');

//Méthode qui permet de crée une appli express
const app = express();

//Importer dotenv
require('dotenv').config();

//Importer Mysql
const mysql = require('mysql2');

//Importer Sequelize
const { Sequelize } = require('sequelize');

//Importer le model User
const User = require('./models/User');



//------------------------Connection mysql bdd=projet7 grace a sequelize-------------------------
const sequelize = new Sequelize(process.env.BDD_PROJET, process.env.USER_NAME, process.env.PASSWORD_USER, {
    host: process.env.HOST_LOCAL,
    dialect: 'mysql'
});

const verification = async function () {
    try {
        await sequelize.authenticate();
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


//Exporter cette application
module.exports = app;