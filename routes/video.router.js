const express = require('express');
const router = express.Router();
const { getAllVideos, addToPlaylist, createPlaylist, removeFromPlaylist } = require('../controllers/video.controller')


router.route('/')
    .get(getAllVideos);

router.route('/playlist/new').post(createPlaylist)
router.route('/playlist/add').post(addToPlaylist)
router.route('/playlist/remove').post(removeFromPlaylist)

module.exports = router;