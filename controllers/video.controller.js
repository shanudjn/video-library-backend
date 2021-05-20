const { Video } = require('../models/video.model')
const { Playlist } = require('../models/playlist.model')

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.status(200).json({ success: true, data: videos })
    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Fetch Videos" })
    }
}

const createPlaylist = async (req, res) => {
    try {
        const { playlistName } = req.body;
        const newPlaylist = await new Playlist({ playlistName: playlistName })
        await newPlaylist.save();

        res.status(200).json({ success: true, message: "Created Playlist Successfully", playlist: newPlaylist })
    } catch (error) {
        res.json(500).json({ success: false, message: "Error Creating Playlist" })
    }
}

const addToPlaylist = async (req, res) => {
    try {
        const { playlistName, videoId } = req.body;

        const videoToBeAdded = await Video.findOne({ videoId: videoId })
        const videoToBeAddedPlaylist = await Playlist.findOne({ playlistName: playlistName })


        videoToBeAddedPlaylist.videos.push(videoToBeAdded)

        const updatedPlaylist = await videoToBeAddedPlaylist.save()

        res.status(200).json({ success: true, message: "Successfully added video to playlist", updatedPlaylist })
    }
    catch (error) {
        res.json({ success: false, message: "Error adding to playlist" })
    }
}

const removeFromPlaylist = async (req, res) => {
    try {
        const { playlistName, videoId } = req.body;

        const videoToBeRemoved = await Video.findOne({ videoId: videoId })
        const playlistToBeRemovedFrom = await (await Playlist.findOne({ playlistName: playlistName }))

        console.log(videoToBeRemoved, playlistToBeRemovedFrom)
        playlistToBeRemovedFrom.videos.pull({ _id: videoToBeRemoved._id })

        const updatedPlaylist = await playlistToBeRemovedFrom.save();

        res.status(200).json({ success: true, message: "Video Removed From Playlist", updatedPlaylist });


    } catch (error) {
        res.status(500).json({ success: false, message: "Failed To Remove From Playlist" })
    }
}

module.exports = { getAllVideos, addToPlaylist, createPlaylist, removeFromPlaylist }