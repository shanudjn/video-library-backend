const mongoose = require('mongoose');
const username = process.env['DB_USERNAME'];
const password = encodeURIComponent(process.env['DB_PASSWORD']);


async function initializeDBConnection() {
    const uri = `mongodb+srv://${username}:${password}@neog-cluster.7up1q.mongodb.net/videolibrary?retryWrites=true&w=majority`;
    try {
        const connectionResponse = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log(`Connected to DB Successfully ✅`)
    } catch (error) {
        console.log(`Error Connecting to DB ❌`)
    }
}

module.exports = { initializeDBConnection }