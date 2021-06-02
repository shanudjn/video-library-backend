const express = require('express');
const { authenticationVerifier } = require('../middleware/authenticationVerifier');
const router = express.Router();
const { getAllNotes, getNotes, addANote, updateNote } = require('../controllers/notes.controller')


router.use(authenticationVerifier);
router.route('/').get(getAllNotes);

router.route('/:videoId').get(getNotes).post(addANote).put(updateNote);

module.exports = router;