const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middleware/authenticationVerifier')
const { register, login, getUserDetails } = require('../controllers/user.controller')

router.route('/register').post(register);
router.route('/login').post(login);
router.param(authenticationVerifier);

//remove this later
router.route('/:userId').get(getUserDetails);


module.exports = router;