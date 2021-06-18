
const db = require("../models");

//Importer Express
const express = require('express');

//Méthode qui permet de crée une appli express
const app = express();

const path = require('path');



//Publier un post
exports.publish = (req, res, next) => {
    
    db.post.create({
        post: req.body.post,
        UserId: req.params.id,
    })

    .then((created) => res.status(201).json(created))
    .catch(error => res.status(400).json({ error }));
};


//Récuperer tous les post sur le Component Actuality
exports.findAllPosts = async (req, res, next) => {
    db.post.findAll()
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch(error => res.status(404).json({ error }));
};


//Uploader une image dans le post
exports.onUpload = (req, res) => {
    db.post.create({
        imageUrl: req.params.app.use('images', express.static(path.join(__dirname, 'images')))
    })

    .then((imgCreate) => res.status(201).json(imgCreate))
    .catch(error => res.status(400).json({ error }));
};