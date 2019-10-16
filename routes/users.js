const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//USER Model 
const User = require('../models/User');


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
       //Validation Passed
        User.findOne({ email: email })
        .then(user => {
            if(user){
                //USER Exists
                errors.push({ msg: 'Email is already registered.'})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash password
                bcrypt.genSalt(10,(err,salt) => 
                    bcrypt.hash(newUser.password, salt,(err,hash) => {
                    if(err) throw err;
                    //Set password to hash
                    newUser.password = hash;
                    //Save the user
                    newUser.save()
                    .then(user => {
                        res.redirect('/login'); 
                    })
                    .catch(err => console.log(err));
                }));
            }
        });


    }

});

module.exports = router;
