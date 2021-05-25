const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Enregistré dans la base de donné les nouveaux Users
exports.signup = (req, res, next) => {
    //Haché le mot de passe
    bcrypt.hash(req.body.password, 12)
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    next();
};



//Login: on récupere le user de la base qui correspond a l'adress mail entré / si email pas bon on renvoi une erreur / 
//on compare le mdp entré avec le hash qui est garder dans la BDD / si pas bon on renvoi une erreur /
// si bon alor on renvoi un TOKEN et un userID

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //Si on arrive ici c'est que on a bien trouvé un user donc on utilise bcrypt pour comparer les mdp
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};