const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const passport = require('passport');
const asana = require('asana');

const client = asana.Client.create().useAccessToken('0/dc7731aaa2b40b10edea27894b40bb01');
client.users.me().then(function(me) {
    console.log(me);
  });
//DB Config
const db = require('./config/keys').MongoURI;

//Passport Config
require('./config/passport')(passport);

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log("MongoDB Connected.."))
.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded ({ extended: false }));

//Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

//Connect Flash Middleware
  app.use(flash());
//Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//Routes


app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));