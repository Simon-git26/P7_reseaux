//Importer express
const express = require('express');
//systeme de route de express
const router = express.Router();

//Importer le controller user
const userCtrl = require('../controllers/createuser');

//Importer le middleware auth 
const auth = require('../middleware/auth');


router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;