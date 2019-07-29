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
            res.status(500).json({ success: false, error: 'There was an error while saving the user to the database. ', err});
        });
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            }else {
                res.status(404).json({ success: false, error: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'The user information could not be retrieved.', err })
        });
});

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const newUser = req.body;

    db.update(id, newUser)
        .then(user => {
            if(user &&(newUser.name && newUser.bio)) {
                res.status(200).json({ success: true, user });
            }
            else if (!user && (newUser.name &&newUser.bio )) {
                res.status(404).json({ success: false, error: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'The user information could not be modified.', err });
        });
});

server.listen(4000, () => {
    console.log('server listening on port 4001');
});