//Importer express
const express = require('express');
//systeme de route de express
const router = express.Router();

//Importer le controller user
const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');


//Importer le middleware auth 
const auth = require('../middleware/auth');

//Impoter multer
const multer = require('../middleware/multer-config');

//-------------Route User-------------
//Incription user
router.post('/register', userCtrl.signup);
//Connection user
router.post('/login', userCtrl.login);
//Trouver un user
router.get('/user', auth, userCtrl.findUser);
//Le profil des users
router.put('/users/:id', auth, userCtrl.profilUser);
//Changer le password user
router.put('/users/:id/change-password', auth, userCtrl.changePassword);

//------------Route Post---------------
//Création Publication
router.post('/users/:id/publication', auth, multer, postCtrl.publish);
//Récuperation publication
router.get('/publications', auth, multer, postCtrl.findAllPosts);


//-----------Route Comments------------
//Création commentaires
router.post('/posts/:id/comment', auth, commentCtrl.postComment);
//Récupération Commentaires
router.get('/comments/:id', auth, commentCtrl.findAllComments);
//Modifier un commentaire
router.put('/comments/:id', auth, commentCtrl.changeComment)
//Supprimer un commentaire
router.delete('/comments/:id/delete', auth, commentCtrl.deleteComment)

module.exports = router;