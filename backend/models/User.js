//Importer Mysql
const mysql = require('mysql2');


//Importer Sequelize, Définir mon model (le relier a la table users de bdd=projet7)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },

    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
    },

    mot_de_passe_confirmation: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

console.log(User === sequelize.models.User);