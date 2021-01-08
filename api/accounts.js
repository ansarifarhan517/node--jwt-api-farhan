const express = require('express');
const jwt = require('jsonwebtoken');
const jsonUser = require('../data/users.json');
const router = express.Router();


//api/account/login

router.get('/login', (req, res) => {
    //get values from request
    const userName = req.body.userName;
    const password = req.body.password;
    //  validate from db
    const user = jsonUser.find(i => i.username === userName && i.password === password);

    if (user) {
        const secretKey = 'farhan123';
        const payload = {
            id: user.id,
            username: user.username
        }
        const option = {
            expiresIn: 3600
        }

        jwt.sign(payload, secretKey, option, (error, token) => {
            if (err) res.status(500).json(error);
            res.json({ token, user })
        });

    }
    else {
        res.status(404).json();
    }
});

module.exports = router;