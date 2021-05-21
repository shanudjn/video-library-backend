require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const { initializeDBConnection } = require('./db/db.connect');
const { errorHandler } = require('./middleware/errorHandler');
const { routeNotFound } = require('./middleware/routeNotFound');
const { populateVideosCollection } = require('./utils/utils');


const app = express();
app.use(cors({ origin: true }));
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());



const videos = require('./routes/video.router')
const playlist = require('./routes/playlist.router')

initializeDBConnection();



app.get('/', (req, res) => {
    res.status(200).json({ "success": true, "message": "Hello Express App" })
})

app.use('/videos', videos);
app.use('/playlist', playlist)

// populateVideosCollection();
app.use(errorHandler);
app.use(routeNotFound)

app.listen(process.env.PORT || 8080, () => {
    console.log('Server Started ✅')
})