require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { initializeDBConnection } = require('./db/db.connect');
const { errorHandler } = require('./middleware/errorHandler');
const { routeNotFound } = require('./middleware/routeNotFound');
const { populateVideosCollection } = require('./utils/utils');

const videos = require('./routes/video.router')

const app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());




initializeDBConnection();





app.get('/', (req, res) => {
    res.status(200).json({ "success": true, "message": "Hello Express App" })
})

app.use('/videos', videos)

// populateVideosCollection();
app.use(errorHandler);
app.use(routeNotFound)

app.listen(process.env.PORT || 8080, () => {
    console.log('Server Started ✅')
})