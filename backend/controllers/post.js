
const { post, user, comments } = require("../models");
const db = require("../models");



//Publier un post
exports.publish = async (req, res, next) => {

    const createObject = {
        post: req.body.post,
        UserId: req.params.id,
    };

    console.log(req.file);

    if (req.file) {
        createObject.imagePath = req.file.path
    }

    db.post.create(createObject)

    .then((created) => res.status(201).json(created))
    .catch(error => res.status(400).json({ error }));
};


//Récuperer tous les post
exports.findAllPosts = async (req, res, next) => {

    db.post.findAll({
        order: [
            ['createdAt', 'DESC'],
            [db.comments, 'createdAt', 'ASC'],
        ],
        include: { all: true, nested: true }
    })

    .then((posts) => {
        res.status(200).json(posts);
    }) 
    .catch(error => res.status(404).json({ error }));
};


exports.modoDeletePosts = async (req, res) => {
    const post = await  db.post.findOne({
        where: {
            id: req.params.id
        }
    });

    post.destroy()
    .then(() => res.status(200).json({ message: 'post supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};