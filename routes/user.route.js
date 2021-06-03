const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middleware/authenticationVerifier')
const { register, login, getUserDetails, getAllusers } = require('../controllers/user.controller')

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/').get(getAllusers)
router.use(authenticationVerifier);


//remove this later
router.route('/:userId').get(getUserDetails);


module.exports = router;