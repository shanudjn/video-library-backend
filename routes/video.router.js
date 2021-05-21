const express = require('express');
const router = express.Router();
const { getAllVideos } = require('../controllers/video.controller')


router.route('/')
    .get(getAllVideos);



module.exports = router;