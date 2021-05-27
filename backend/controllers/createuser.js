const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connect } = require('../app');

const db = require("../models");

//MOT DE PASSE FORT 
var passwordValidator = require('./password-validator');

//Enregistré dans la base de donné les nouveaux Users
exports.signup = (req, res, next) => {
    //password validator
   var isValid = passwordValidator.validate(req.body.password);
   if (!isValid) {
       res.status(400).json({ error : "mot de passe non valide pour le package password validator" });
   }
    //Haché le mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        db.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        })
        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch(error => res.status(400).json({ error: error.message }));
    })
    .catch(error => res.status(500).json({ error: error.message }));
};



//Login: on récupere le user de la base qui correspond a l'adress mail entré / si email pas bon on renvoi une erreur / 
//on compare le mdp entré avec le hash qui est garder dans la BDD / si pas bon on renvoi une erreur /
// si bon alor on renvoi un TOKEN et un userID

exports.login = (req, res) => {
    console.log(req.body.email);
    db.user.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //Si on arrive ici c'est que on a bien trouvé un user donc on utilise bcrypt pour comparer les mdp
        
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            console.log('valid', valid);
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};