const express = require('express');

const router = express.Router();

//LOGIN PAGE
router.get('/login', (req,res) => res.render('Login'));

//Register
router.get('/register', (req,res) => res.render('Register'));

// Register Handle
router.post('/register',(req,res) => {
    console.log(req.body)
    res.send('hello')
});

module.exports = router;
