
const db = require("../models");

//Publier un post
exports.publish = (req, res, next) => {

    db.post.create({
        post: req.body.post,
        UserId: req.params.id
    })

    .then((created) => res.status(201).json(created))
    .catch(error => res.status(400).json({ error }));
};


//Récuperer tous les post sur le Component Actuality
exports.findAllPosts = async (req, res) => {
    db.post.findAll()
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch(error => res.status(404).json({ error }));
};