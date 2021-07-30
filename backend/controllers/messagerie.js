const { messagerie, user} = require("../models");
const db = require("../models");


// Crée un message avec le user connecté
exports.createMessage = async (req, res, next) => {
    db.messagerie.create({
        expediteurId: req.params.id,
        destinataireId: req.body.user,
        contenu: req.body.message,
    })
    
    .then((createdMessage) => {
        console.log(createdMessage);
        res.status(201).json(createdMessage)
    })
    
    .catch(error => res.status(400).json({ error }));
};



// Recuperation des messages pour id → expediteurId + destinataireId
exports.findAllMessages = async (req, res) => {
    console.log(req.query)

    db.messagerie.findAll({
        where: {
            
            expediteurId: [ req.query.expediteur,  req.query.destinataire ],
            destinataireId: [ req.query.destinataire, req.query.expediteur ]
            
        },

        order: [
            ['createdAt', 'ASC'],
        ],

        include: { all: true }
    })

    .then((findMessage) => {
        res.status(201).json(findMessage)
    })
    
    .catch(error => res.status(400).json({ error }));
};