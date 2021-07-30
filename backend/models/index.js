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

//Importer le model User.js / Comments.js / Post.js
db.user = require('./User')(sequelize, Sequelize);
db.comments = require('./Comments')(sequelize, Sequelize);
db.post = require('./Post')(sequelize, Sequelize);
db.messagerie = require('./Messagerie')(sequelize, Sequelize);


//------------------Création des clé étrangère----------------------
//Relié ma table Post a ma table Comments
db.post.hasMany(db.comments);
db.comments.belongsTo(db.post);
//Relier ma table Users a ma table Comments
db.user.hasMany(db.comments);
db.comments.belongsTo(db.user);
//Relier ma table Users a ma table Post
db.user.hasMany(db.post);
db.post.belongsTo(db.user);

//Relier ma table Users a ma table Messagerie
db.user.hasMany(db.messagerie);
db.messagerie.belongsTo(db.user, { as: 'expediteur' });
//Relier ma table Users a ma table Messagerie
db.user.hasMany(db.messagerie);
db.messagerie.belongsTo(db.user, { as: 'destinataire' });


//Exporter db avec les infos dedans
module.exports = db;