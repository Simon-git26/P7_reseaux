const { comments } = require("../models");
const db = require("../models");


//Poster un commentaire
exports.postComment = async (req, res, next) => {
    console.log(req.userId);

    db.comments.create({
        UserId: req.userId,
        PostId: parseInt(req.params.id),
        comment: req.body.comment,
    })
    
    .then((commentOk) => {
        console.log(commentOk);
        res.status(201).json(commentOk)
    })
    
    .catch(error => res.status(400).json({ error }));
};


//Modifier son commentaire
exports.changeComment = async (req, res, next) => {
    const comment = await db.comments.findOne({
        where: {
            UserId: req.userId,
            id: req.params.id
        },
    });

    if (!comment) {
        res.status(400).json({ error : "Impossible de récuperer le commentaire !" });
        return
    }

    comment.comment = req.body.comment;
    console.log('comment', comment);
    
    comment.save()
    .then(() => res.status(200).json({ message: 'Commentaire changé !' }))
    .catch(error => res.status(400).json({ error }));
};



//Suprimer un commantaire
exports.deleteComment = async (req, res, next) => {
    const comment = await  db.comments.findOne({
        where: {
            id: req.params.id
        }
    });

    comment.destroy()
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};