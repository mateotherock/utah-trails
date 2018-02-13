require('dotenv').config();
const express = require('express')
        , massive = require('massive');

const {
    CONNECTION_STRING,
    SERVER_PORT
} = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
});

app.get('/api/markers', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_map_markers()
    .then(markers => {res.status(200).send(markers);})
    .catch(err => {res.status(500).send(err);})
})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})