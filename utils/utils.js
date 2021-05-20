const videos = require('../data/video.data');
const { Video } = require('../models/video.model')


function populateVideosCollection() {

    try {
        videos.forEach(async (video) => {
            const newVideo = new Video(video);
            const savedVideo = await newVideo.save()
            console.log(savedVideo)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { populateVideosCollection };