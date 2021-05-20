const express = require('express')


const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ "success": true, "message": "Hello Express App" })
})


app.listen(process.env.PORT || 8080, () => {
    console.log('Server Started ✅')
})