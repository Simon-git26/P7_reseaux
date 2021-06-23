const { comments } = require("../models");
const db = require("../models");


//Poster un commentaire
exports.postComment = async (req, res, next) => {
    console.log(req.userId);

    db.comments.create({
        UserId: req.userId,
        PostId: req.params.id,
        comment: req.body.comment
    })
    

    .then((commentOk) => res.status(201).json(commentOk))
    .catch(error => res.status(400).json({ error }));
};


//Récuperer tous commentaires
exports.findAllComments = async (req, res) => {

    db.comments.findAll()

    .then((comment) => res.status(201).json(comment))
    .catch(error => res.status(400).json({ error }));
};