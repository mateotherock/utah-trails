require('dotenv').config();
const express = require('express')
        , massive = require('massive')
        , bodyParser = require('body-parser');

const {
    CONNECTION_STRING,
    SERVER_PORT
} = process.env;

const app = express();
app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
});

app.get('/api/markers', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_map_markers()
    .then(markers => {res.status(200).send(markers);})
    .catch(err => {res.status(500).send(err);})
})

app.get('/api/trail/:name', (req, res) => {
    const trailName = req.params.name;
    const dbInstance = req.app.get('db');
    dbInstance.get_trail([trailName])
    .then(trail => {res.status(200).send(trail[0]);})
    .catch(err => {res.status(500).send(err);})
})

app.get('/api/tags/:name', (req, res) => {
    const trailName = req.params.name;
    const dbInstance = req.app.get('db');
    dbInstance.get_trail_tags([trailName])
    .then(tags => {
        let tagsToSend = tags.map(tagObj => {
            return tagObj.tag_name;
        })
        res.status(200).send(tagsToSend);})
    .catch(err => {res.status(500).send(err);})
})

app.get('/api/trails', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.get_trails()
    .then(trails => {res.status(200).send(trails);})
    .catch(err => {res.status(500).send(err);})
})

app.post('/api/trails', (req, res) => {
    console.log(req.body)
    let { difficulty, area, length, eGain } = req.body;
    length = Number(length);
    eGain = Number(eGain);
    difficulty = difficulty || "(Easy|Medium|Hard)";
    area = area || "(Utah County|Grand County)";
    length === 0 ? length = 999 : length = length;
    eGain === 0 ? eGain = 99999 : eGain = eGain;
    console.log(difficulty, area, length, eGain)
    const dbInstance = req.app.get('db');
    dbInstance.filter_trails([difficulty, area, length, eGain])
    .then(trails => {res.status(200).send(trails);})
    .catch(err => {console.log(err); res.status(500).send(err);})
})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})