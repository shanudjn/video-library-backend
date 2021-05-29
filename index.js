require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const { initializeDBConnection } = require('./db/db.connect');
const { populateVideosCollection } = require('./utils/utils');
const { errorHandler } = require('./middleware/errorHandler');
const { routeNotFound } = require('./middleware/routeNotFound');
const { authenticationVerifier } = require('./middleware/authenticationVerifier')



const app = express();
app.use(cors({ origin: true }));
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());



const videos = require('./routes/video.router');
const playlist = require('./routes/playlist.router');
const users = require('./routes/user.route');

initializeDBConnection();



app.get('/', (req, res) => {
    res.status(200).json({ "success": true, "message": "Hello Express App" })
})

//Routers
app.use('/videos', videos);


app.use('/playlist', playlist);
app.use('/users', users)




// populateVideosCollection();
app.use(errorHandler);
app.use(routeNotFound)

app.listen(process.env.PORT || 8080, () => {
    console.log('Server Started ✅')
})