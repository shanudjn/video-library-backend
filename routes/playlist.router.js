const express = require('express');
const router = express.Router();

const { getAllPlaylist, addToPlaylist, createPlaylist, removeFromPlaylist,
    getUserPlaylist, getPlaylist, addToAPlaylist, removeFromAPlaylist, createNewPlaylist, removeAPlaylist } = require('../controllers/playlist.controller');
const { authenticationVerifier } = require('../middleware/authenticationVerifier');

// router.route('/').get(getAllPlaylist)

router.route('/add').post(addToPlaylist)
router.route('/remove').post(removeFromPlaylist);


router.use(authenticationVerifier);
router.route('/').get(getUserPlaylist).post(createNewPlaylist);
router.route('/:playlistId').get(getPlaylist).post(addToAPlaylist).delete(removeAPlaylist)
router.route('/:playlistId/:videoId').delete(removeFromAPlaylist)
module.exports = router