const { Video } = require('../models/video.model')
const { Playlist } = require('../models/playlist.model')

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.status(200).json({ success: true, videos })
    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Fetch Videos" })
    }
}


module.exports = { getAllVideos }