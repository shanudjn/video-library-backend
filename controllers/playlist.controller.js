const { Video } = require('../models/video.model');
const { Playlist } = require('../models/playlist.model');
const { extend } = require("lodash");
const { User } = require('../models/user.model');


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

const getUserPlaylist = async (req, res) => {
    try {
        const { userId } = req.user
        console.log("userID from authenticator", userId)
        const user = await User.find({ _id: userId })
        const playlist = await Playlist.find({ userId: userId }).populate({
            path: 'videos',
            model: 'Video'
        });
        res.status(200).json({ success: true, playlist })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message })
    }
}
const getPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params

        console.log(playlistId);

        const playlist = await Playlist.findById({ _id: playlistId }).populate(
            {
                path: 'videos',
                model: 'Video'
            }
        )
        console.log(playlist)
        res.status(200).json({ success: true, playlist })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }

}

const addToAPlaylist = async (req, res) => {
    try {
        const { videoId } = req.body
        const { playlistId } = req.params

        console.log("playlistId", playlistId)
        const playlist = await Playlist.findById({ _id: playlistId })

        playlist.videos.push(videoId);

        const updatedPlaylist = await playlist.save();
        res.json({ success: true, updatedPlaylist })
    }
    catch (error) {
        console.log(error.message)

        res.json({ success: false, error: error.message })
    }
}

const removeFromAPlaylist = async (req, res) => {
    // const { videoId } = req.body
    const { playlistId, videoId } = req.params
    console.log("videoId", videoId)
    console.log("playlistId", playlistId)
    const playlist = await Playlist.findById({ _id: playlistId })
    playlist.videos.pull(videoId)
    const updatedPlaylist = await playlist.save();
    res.json({ success: true, updatedPlaylist })
}

const createNewPlaylist = async (req, res) => {
    try {
        const { playlistName } = req.body;
        const { userId } = req.user
        const newPlaylist = await new Playlist({ userId: userId, playlistName: playlistName })
        await newPlaylist.save();

        res.status(200).json({ success: true, message: "Created Playlist Successfully", playlist: newPlaylist })
    } catch (error) {
        res.json(500).json({ success: false, message: "Error Creating Playlist" })
    }
}

const removeAPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const playlistToBeDeleted = await Playlist.deleteOne({ _id: playlistId })

    console.log(playlistToBeDeleted)
    res.json(playlistToBeDeleted)
}


module.exports = {
    getAllPlaylist, addToPlaylist, createPlaylist, removeFromPlaylist, getUserPlaylist, getPlaylist, addToAPlaylist,
    removeFromAPlaylist, createNewPlaylist, removeAPlaylist
}



