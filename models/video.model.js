const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideoSchema = new Schema({
    videoId: String,
    title: String,
    channel: String,
    thumbnail: String,
    category: String,
    channelImage: String
})

const Video = mongoose.model('Video', VideoSchema);

module.exports = { Video }