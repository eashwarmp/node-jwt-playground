const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();

app.get('/api', (req,res) => {
    res.json({ 
        message: "Welcome to the api"
     });
});

app.post('/api/posts', auth, (req, res) => {
    console.log(req.token)
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(401);
        } else {
            res.json({
                message: 'Post created',
                authData
            })
        }
    });
    res.json({
        message: 'Post Created.....'
    })
})

app.post('/api/login', (req,res) => {
    //Mock User
    const user = {
        id: 1,
        username: 'eashwar',
        email: 'eashwar1998@gmail.com'
    }
    jwt.sign({ user }, 'secretkey', {expiresIn: '80s'},  (err, token) => {
        res.json({
            token
        })
    });
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//Authentication
function auth(req,res,next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get toke from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //Next middleware
        next();
    } else {
        //Forbidden
        res.status(403).json("Please enter a valid Authorization Header")
    }
}

app.listen(5000, () => console.log('Server started'));