const express = require('express')
const app = express()
require('dotenv').config()
let mongodb = require('mongodb');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
});

// loading static files
// adapted from: https://www.youtube.com/watch?v=A01KtJTv1oc&ab_channel=RaddyTheBrand
//app.use(express.static(__dirname +"/public"));
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(__dirname + "/public/css/style-qc.css"));
app.use('/css', express.static(__dirname + "/public/css/qcfirst-style.css"));
app.use('/js', express.static(__dirname + "/public/js"));
app.use('/img', express.static(__dirname + "/public/img"));

// set views
//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');

app.get('/', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/index.html");
});

// database information
mongoose.connect("mongodb+srv://marinos:open123@cluster0.7pdeb.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});

// create schema
const { Schema } = mongoose;

// schema for new Classes
const CLASS  = new Schema({
    term: {type: String, required: true},
    courseName: {type: String, required: true},
    courseNumber: {type: Number, required: true, index: {unique: true}},
    classDate: {type: Date, default: Date.now},
    classDescription: {type: String, required: true},
    capacity: {type: Number, required: true}
});

// schema for new users
const NEWUSER = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    passwordConfirm: {type: String, required: true},
    userType: {type: String, required: true},
    classes: {type: [CLASS]}
});

// create model
let userCreate = mongoose.model("userCreate", NEWUSER);
let classCreate = mongoose.model("classCreate", CLASS);

// create post request because of form
app.post("qcfirst/html/create-account-page.html", bodyParser.urlencoded({extended: false}), function (req, res) {

    // storage variables for new user (based on name="information" from the respected html file)
    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    let username = req.body.username;
    let password_orig = req.body.password;
    let confirmPassword = req.body["confirm-password"];
    let userType = req.body["user-type"];

    // see if user is already in database, otherwise display error and create a new user
    NEWUSER.findOne({username: username}, function(err, foundUser){
        if(err) return res.json({error: "error occurred"});
        if (foundUser) return res.json({error:"Username already taken"});
        else {

            // checks on data

            // add attributes to new user
            let new_user = new NEWUSER({
                firstName: firstname,
                lastName: lastname,
                userName: username,
                password: password_orig,
                passwordConfirm: confirmPassword,
                userType: userType
            });

            new_user.save((err, data) => {
                if (err) return console.error(err);
                done(null, data);
            });
        }
    });
});

// Adapted from: https://www.youtube.com/watch?v=-RCnNyD0L-s
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

// const initializePassport = require('./passport-config')
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )

// const users = []

// app.set('view-engine', 'html')
// app.use(express.urlencoded({ extended: false}))
// app.use(flash())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))

// app.get('/', checkAuthenticated, (req, res) => {
//   res.render('index.html', { name: req.user.name })
// })

// app.get('/login',  checkNotAuthenticated, (req, res) => {
//   res.render('login-page-html.html')
// })

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }))


// app.get('/create-account-page', checkNotAuthenticated, (req, res) => {
//   res.render('create-account-page.html')
// })

// app.post('/create-account-page', checkNotAuthenticated, (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword
//     })
//     res.redirect('/login')
//   } catch {
//     res.redirect('/create-account-page')

//   }
//   req.body.username

// })

// // app.delete('/logout', (req, res) => {
// //   req.logOut()
// //   res.redirect('/login')
// // })

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { // if true
//     return next()
//   }

//   res.redirect('/login')
// }

// // if false
// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next()
// }
