const mongoose = require('mongoose')
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
    playlistName: String,
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }]
})

const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = { Playlist }