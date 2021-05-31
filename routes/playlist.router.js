const express = require('express');
const router = express.Router();

const { getAllPlaylist, addToPlaylist, createPlaylist, removeFromPlaylist, getUserPlaylist, getPlaylist, addToAPlaylist, removeFromAPlaylist } = require('../controllers/playlist.controller');
const { authenticationVerifier } = require('../middleware/authenticationVerifier');

// router.route('/').get(getAllPlaylist)

router.route('/add').post(addToPlaylist)
router.route('/remove').post(removeFromPlaylist);


router.use(authenticationVerifier);
router.route('/').get(getUserPlaylist);
router.route('/:playlistId').get(getPlaylist).post(addToAPlaylist).delete(removeFromAPlaylist)


module.exports = router