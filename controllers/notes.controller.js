const { Notes } = require('../models/notes.model')

const getAllNotes = async (req, res) => {
    try {
        const allNotes = await Notes.find({})
        res.json({ success: true, allNotes })
    } catch (error) {
        console.log(error);
        res.json({ success: false, errorMessage: error.message })
    }
}

const getNotes = async (req, res) => {
    try {
        const { userId } = req.user
        const { videoId } = req.params
        console.log(typeof (userId), "userId", userId)
        const notes = await Notes.findOne({ userId: userId, videoId: videoId })
        res.json({ notes })

    } catch (error) {
        res.json({ error: error.message })
    }
}
const addANote = async (req, res) => {
    console.log("adding a note")
    try {
        const { userId } = req.user
        const { note } = req.body;
        const { videoId } = req.params
        const notesAlreadyPresent = await Notes.findOne({ userId: userId, videoId: videoId })
        console.log(notesAlreadyPresent)
        if (notesAlreadyPresent === null) {

            const notes = await new Notes({ userId: userId, videoId: videoId, notes: [note] })
            await notes.save();
            res.json({ notes, notesText: note })
        }

        else {
            notesAlreadyPresent.notes.push(note)
            notesAlreadyPresent.save();

            console.log(notesAlreadyPresent)

            res.json({ notesAlreadyPresent })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ error: error.message })
    }

}
const updateNote = async (req, res) => {
    try {
        const { userId } = req.user;
        const { videoId } = req.params;
        const { note } = req.body;

        const noteToBeUpdated = await Notes.findOne({ userId: userId, videoId: videoId })

        noteToBeUpdated.notes.push(note);
        noteToBeUpdated.save()
        console.log("sending")
        res.json({ noteToBeUpdated })

    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = { getAllNotes, getNotes, addANote, updateNote }