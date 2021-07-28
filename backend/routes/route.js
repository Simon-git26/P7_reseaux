//Importer express
const express = require('express');
//systeme de route de express
const router = express.Router();

//Importer le controller user
const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const messageCtrl = require('../controllers/messagerie');


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
//Supprimer un user de la BDD
router.delete('/users/:id/delete', auth, userCtrl.deleteUser);
//Mettre une image de Profil
router.post('/users/:id/picture', auth, multer, userCtrl.savePicture);
//Recuperer tous les users
router.get('/users', auth, userCtrl.findAllUsers);
// Delete un user par le Modo
router.delete('/users/:id/modoDelete', auth, userCtrl.modoDeleteUser);
// Trouver un user comme destinataire pour messagerie
router.get('/users/:id/destinataire', auth,  userCtrl.findUserMessagerie);


//------------Route Post---------------
//Création Publication
router.post('/users/:id/publication', auth, multer, postCtrl.publish);
//Récuperation publication
router.get('/publications', auth, multer, postCtrl.findAllPosts);
// Suppression de post par modo
router.delete('/publications/:id', auth, postCtrl.modoDeletePosts);
//Récuperation des posts du user connecté
router.get('/user/:id/publications', auth, postCtrl.getPublications);
// Suppression de post Profil*
router.delete('/users/publications/:id', auth, postCtrl.deletePosts);


//-----------Route Comments------------
//Création commentaires
router.post('/posts/:id/comment', auth, commentCtrl.postComment);
//Modifier un commentaire
router.put('/comments/:id', auth, commentCtrl.changeComment);
//Supprimer un commentaire
router.delete('/comments/:id/delete', auth, commentCtrl.deleteComment);


// Route Messagerie
router.post('/users/:id/messagerie', auth,  messageCtrl.createMessage);

module.exports = router;