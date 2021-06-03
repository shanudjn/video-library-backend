const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    videoId: { type: Schema.Types.ObjectId, ref: "Video", unique: true },
    notes: [{ type: String }]
})

const Notes = mongoose.model('Note', NoteSchema)

module.exports = { Notes }