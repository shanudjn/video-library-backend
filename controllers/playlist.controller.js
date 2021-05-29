const { Video } = require('../models/video.model')
const { Playlist } = require('../models/playlist.model')


const getAllPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.find({}).populate({
            path: 'videos',
            model: 'Video'
        })

        console.log(playlist)

        res.status(200).json({ success: true, playlist })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching playlists" })
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

        const videoToBeAdded = await Video.findOne({ _id: videoId })
        console.log(videoToBeAdded)
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



        const videoToBeRemoved = await Video.findOne({ _id: videoId })
        const playlistToBeRemovedFrom = await Playlist.findOne({ playlistName: playlistName }).populate({
            path: 'videos',
            model: 'Video'
        })


        const updatedPlaylist = playlistToBeRemovedFrom.videos.filter(item => String(item._id) !== String(videoToBeRemoved._id))

        const response = await Playlist.updateOne({ _id: playlistToBeRemovedFrom._id }, { videos: updatedPlaylist })



        res.status(200).json({ success: true, message: "Video Removed From Playlist", updatedPlaylist });


    } catch (error) {
        res.status(500).json({ success: false, message: "Failed To Remove From Playlist", msg: error.message })
    }
}

module.exports = { getAllPlaylist, addToPlaylist, createPlaylist, removeFromPlaylist }