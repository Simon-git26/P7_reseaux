
const db = require("../models");

//Publier un post
exports.publish = (req, res, next) => {
    const multerObject = JSON.parse(res.body.Post);

    db.post.create({
        post: req.body.post,
        UserId: req.params.id,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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