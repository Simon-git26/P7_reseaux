//Importer sequelize
const Sequelize = require('sequelize');

//------------------------Connection mysql bdd=projet7 grace a sequelize-------------------------
const sequelize = new Sequelize(process.env.BDD_PROJET, process.env.USER_NAME, process.env.PASSWORD_USER, {
    host: process.env.HOST_LOCAL,
    dialect: 'mysql'
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Importer le model User.js
db.user = require('./User')(sequelize, Sequelize);

//Exporter db avec les infos dedans
module.exports = db;