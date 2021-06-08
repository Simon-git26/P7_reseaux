
const { connect } = require('../app');

const { post } = require('../models');

const db = require("../models");


exports.publish = (req, res) => {

    db.post.create({
        post: req.body.post,
        UserId: req.params.id
    })

    .then((created) => res.status(201).json(created))
    .catch(error => res.status(400).json({ error }));
};