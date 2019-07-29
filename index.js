// implement your API here

const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const user = req.body;

    db.insert(user)
        .then(users => {
            if(!user.name || !user.bio) {
                res.status(400).json({ success: false, errorMessage: 'PLease provide name and bio for the user.'});
            } else {
                res.status(201).json({ success: true, users });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'Therewas an error while saving the user to the database. ', err});
        });
});

