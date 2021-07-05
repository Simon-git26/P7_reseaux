
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
            ['createdAt', 'DESC']
        ],
        include: { all: true, nested: true }
    })

    .then((posts) => {
        res.status(200).json(posts);
    }) 
    .catch(error => res.status(404).json({ error }));
};



//Like et dislike
// exports.likeDislike = async (req, res) => {
//     const reqBody = req.body;
//     const like = reqBody.like;
//     const userId = reqBody.UserId;
// 
//     db.post.findOne({ id: req.params.id })
//     
// 
//     .then(post => {
//         //Si le users like la sauce il se passera:
//         switch(like) {
//             case +1:
//                 db.post.updateOne(
//                     {id: req.params.id},
//                     {$push: {userLiked: userId}, $inc: {like: +1}},
//                     console.log('Salut je suis +1')
//                 )
//             .then(() => res.status(200).json({ message: "Sauce Liké !" }))
//             .catch(error => res.status(400).json({ error }));
//             break;
// 
//             case -1:
//                 db.post.updateOne(
//                     {id: req.params.id},
//                     {$push: {userDisliked: userId}, $inc: {dislike: -1}},
//                     console.log('Bonjour je suis -1')
//                 )
//             .then(() => res.status(200).json({ message: "Sauce Disliké !"}))
//             .catch(error => res.status(400).json({ error }));
//             break;
// 
// 
//             case 0:
//                 db.post.updateOne(
//                     {id: req.params.id},
//                     {$push: {userCancel: userId}, $inc: {cancel: 0}},
//                     console.log('Oui jannule')
//                 )
//                 .then(() => res.status(200).json({ message: "Like/Dislike annulé !"}))
//             .catch(error => res.status(400).json({ error }));
//             break;
//         }
//     });
// };