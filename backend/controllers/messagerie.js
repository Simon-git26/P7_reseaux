const { messagerie, user} = require("../models");
const db = require("../models");


// Crée un message avec le user connecté
exports.createMessage = async (req, res) => {
    db.messagerie.create({
        expediteurId: req.params.id,
        contenu: req.body.message,
    })
    
    .then((createdMessage) => {
        console.log(createdMessage);
        res.status(201).json(createdMessage)
    })
    
    .catch(error => res.status(400).json({ error }));
};