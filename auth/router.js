const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../api/config.js");
const { router } = require('../api/server.js');
const router = express.Router();

router.use('/register', (req, res) => {
    const credentials = req.body;
    if(isValid(credentials)) {
        const rounds = prcess.env.HASH_ROUNDS || 6;
        const hash = bcryptjs.hashSynce(crendentials.password, rounds);
        Users.addUser(credentials)
        .then((user) => {
            res.status(201).json({data: user, message: 'success!'})
        })
        .catch((err) => {
            res.status(500).json({message: err.message});
        });
    } else {
        res.status(400).json({
            message: 'please provide username & password.',
        });
    }
});

router.use('/login', (req, res) => {
    const { username, password} = req.body;

    if (isValid(req.body)) {
        Users.findBy({username})
        .then(([user]) => {
            if (user && bcryptjs.compareSynce(password, user.password)) {
                const token = getJwt(user);
                res.status(200).json({message: "Welcome to our API", token});
            } else {
                res.status(401).json({message: 'Invalid credentials D:'});
            }
        })
        .catch((error) => {
            res.status(500).json({message: error.message});
        });
    } else {
        res.status(400).json({ message: 'please provide username and password'});
    }
});

function getJwt(user) {
    const payload = {
        username: user.username,
        role: user.role
    }
    const jwtOptions = {
        expiresIn: '1d'
    };
    
    return jwt.sign(payload, config.jwtSecret, jwtOptions)
};


module.exports = router;