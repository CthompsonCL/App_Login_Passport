const express = require('express');

const router = express.Router();

//LOGIN PAGE
router.get('/login', (req,res) => res.render('Login'));

//Register
router.get('/register', (req,res) => res.render('Register'));

// Register Handle
router.post('/register',(req,res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields 
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all files' });
    }

    //Check password matchs
    if(password !== password2){
        errors.push({ msg: 'Password do not match'});
    }

    //Check pass length 
    if(password.length < 6){
        errors.push({msg: 'Password should be at least 6 character'});
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        res.send('pass');
    }

});

module.exports = router;
