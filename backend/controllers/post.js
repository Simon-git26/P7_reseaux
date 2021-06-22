
const { post } = require("../models");
const db = require("../models");


//Publier un post
exports.publish = async (req, res, next) => {

    db.post.create({
        post: req.body.post,
        UserId: req.params.id,
        imagePath: req.file.path
    })

    .then((created) => res.status(201).json(created))
    .catch(error => res.status(400).json({ error }));
};




//Récuperer tous les post + affichage des images 
exports.findAllPosts = async (req, res) => {

    db.post.findAll()

    .then((posts) => {
        posts.forEach(post => {
            if (post.imagePath) {
                post.imageUrl = `${req.protocol}://${req.get('host')}/${post.imagePath}`
            }
        })
        res.status(200).json(posts);
    }) 
    .catch(error => res.status(404).json({ error }));
};