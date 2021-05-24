const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const router = express.Router;
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const passport = require("passport");

// passport config
require("./config/passport")(passport);

//listening
app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
});

// loading static files
// adapted from: https://expressjs.com/en/starter/static-files.html [5/3/2021]
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
// end adaptation

// adapted from [5/9/2021]: https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia

// database information
mongoose.connect("mongodb+srv://marinos:open123@cluster0.7pdeb.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// body parser
app.use(express.urlencoded({ extended: false }));

// express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// end adaptation