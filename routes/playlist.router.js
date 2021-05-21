const express = require('express');
const router = express.Router();

const { getAllPlaylist, addToPlaylist, createPlaylist, removeFromPlaylist } = require('../controllers/playlist.controller')

router.route('/').get(getAllPlaylist)
router.route('/new').post(createPlaylist)
router.route('/add').post(addToPlaylist)
router.route('/remove').post(removeFromPlaylist)


module.exports = router