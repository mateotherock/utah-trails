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

app.get('/api/trail/:id', (req, res) => {
    const trailId = req.params.id;
    const dbInstance = req.app.get('db');
    dbInstance.get_trail([trailId])
    .then(trail => {res.status(200).send(trail[0]);})
    .catch(err => {res.status(500).send(err);})
})

app.get('/api/trails', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_trails()
    .then(trails => {res.status(200).send(trails);})
    .catch(err => {res.status(500).send(err);})
})

app.post('/api/trails', (req, res) => {
    const dbInstance = req.app.get('db');
    console.log(req.body)
})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})