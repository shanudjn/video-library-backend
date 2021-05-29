const mongoose = require('mongoose')
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true

    },
    playlistName: String,
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }]
})

const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = { Playlist }