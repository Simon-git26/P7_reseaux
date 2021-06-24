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


//Récuperer tous les commentaires
exports.findAllComments = async (req, res, next) => {

    db.comments.findAll({
        where: {
            PostId: req.params.id
        }
    })

    .then((comment) => res.status(201).json(comment))
    .catch(error => res.status(400).json({ error }));
};


/*//Modifier son commentaire
exports.changeComment = async (req, res) => {
    // Chercher le user qui correspond à req.params.id dans la bdd.
    const comment = await  db.comments.findOne({
        where: {
            id: req.params.id
        }
    });
    comment.comment = req.body.comment;
    console.log('comment', comment);
    comment.save()
    .then(() => res.status(200).json({ message: 'Commentaire changé !' }))
    .catch(error => res.status(400).json({ error }));
};*/