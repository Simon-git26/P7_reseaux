const { comments } = require("../models");
const db = require("../models");


//Poster un commentaire
exports.postComment = async (req, res) => {
    db.comments.create({
        UserId: req.params.id,
        comments: req.body.comment
    })

    .then((commentOk) => res.status(201).json(commentOk))
    .catch(error => res.status(400).json({ error }));
};