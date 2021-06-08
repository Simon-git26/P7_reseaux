
const { connect } = require('../app');

const { post } = require('../models');

const db = require("../models");


exports.publish = async (req, res) => {
    // Chercher le user qui correspond à req.params.id dans la bdd.
    const user = await  db.user.findOne({
        where: {
            id: req.params.id
        }
    });
    user.posts = req.body.post;
    console.log('user', user);
    user.save()
    .then(() => res.status(200).json({ message: 'Publication sauvegardée dans post' }))
    .catch(error => res.status(400).json({ error }));
};