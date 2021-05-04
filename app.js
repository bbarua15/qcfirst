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

app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
});

// loading static files
// adapted from: https://www.youtube.com/watch?v=A01KtJTv1oc&ab_channel=RaddyTheBrand
//app.use(express.static(__dirname +"/public"));
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

// set views
//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');

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
    creationDate: {type: Date, default: Date.now},
    classes: {type: [CLASS]}
});

// create model
let userCreate = mongoose.model("userCreate", NEWUSER);
let classCreate = mongoose.model("classCreate", CLASS);

// GET REQUESTS
app.get('/', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/index.html");

});

app.get('/index.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/index.html");

});

app.get('/login-page-html.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/login-page-html.html");
});

app.get('/forgot-password-html.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/forgot-password-html.html");
});

app.get('/create-account-page.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/create-account-page.html");
});

app.get('/add-class.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/add-class.html");
});

app.get('/change-password-instructor.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/change-password-instructor.html");
});

app.get('/change-password-student.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/change-password-student.html");
});

app.get('/class-deadline-instructor.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/class-deadline-instructor.html");
});

app.get('/class-deadline-student.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/class-deadline-student.html");
});

app.get('/create-class.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/create-class.html");
});

app.get('/delete-class.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/delete-class.html");
});

app.get('/drop-class.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/drop-class.html");
});

app.get('/instructor-course-dictionary-html.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/instructor-course-dictionary-html.html");
});

app.get('/student-course-dictionary-html.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/student-course-dictionary-html.html");
});

app.get('/instructor-dashboard-html.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/instructor-dashboard-html.html");
});

app.get('/student-dashboard-html.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/student-dashboard-html.html");
});

app.get('/shopping-cart.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/shopping-cart.html");
});

app.get('/create-class.html', (req, res) => {
    // load html file
    res.sendFile(__dirname + "/views/html/create-class.html");
});

// adapted from [5/3/2021]: https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified
// create a post request for the login page
app.post("/login-page.html", bodyParser.urlencoded({extended: false}), async function (req, res) {

});

// create a post request for the create account page
app.post("/create-account-page.html", bodyParser.urlencoded({extended: false}), async function (req, res) {

    // check to see if username and password are suitable


    try {
        // hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // storage variables for new user (based on name="information" from the respected html file)
        let firstname = req.body.firstName;
        let lastname = req.body.lastName;
        let username = req.body.username;
        let password_orig = hashedPassword;
        let confirmPassword = req.body["confirm-password"];
        let userType = req.body["user-type"];

        // see if user is already in database, otherwise display error and create a new user
        NEWUSER.findOne({username: username}, function(err, foundUser){
            if(err) return res.json({error: "error occurred"});
            if (foundUser) return res.json({error:"Username already taken"});
            else {

                // add attributes to new user
                let new_user = new NEWUSER({
                    firstName: firstname,
                    lastName: lastname,
                    userName: username,
                    password: password_orig,
                    passwordConfirm: confirmPassword,
                    userType: userType
                });

                console.log(new_user);

                new_user.save((err, data) => {
                    if (err) return console.error(err);
                    console.log("user saved");
                    res.redirect("/login-page-html")
                    done(null, data);
                });
            }
        });

    } catch {
        res.redirect("/create-account-page");
    }

});
// end adaptation

// Adapted from: https://www.youtube.com/watch?v=-RCnNyD0L-s
// app.set('view engine', 'html');
// app.use(bodyParser.urlencoded({extended:true}));


// const mySecret = process.env['SESSION_SECRET']
// app.use(require("express-session")({
//     secret: process.env.SESSION_SECRET, 
//     resave: false,
//     saveUninitialized: false
// }));

// // set passport up to use in the application
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.use(new LocalStrategy(User.authenticate()));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + "/views/html/index.html");
// });

// app.get('/student-dashboard-html.html', isLoggedIn, (req, res) => {
//     res.sendFile(__dirname + "/views/html/student-dashboard-html.html");
// });

// app.get('/create-account-page.html', (req, res) => {
//     res.sendFile(__dirname + "/views/html/create-account-page.html");
// });

// // passport will authenticate the user using local and redirect the page to the student dashboard
// app.post("//create-account-page.html", function(req, res){
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.sendFile(__dirname + "/views/html/create-account-page.html");
//         } else {
//             passport.authenticate("local")(req, res, function(){
//                 res.redirect("/views/html/student-dashboard-html.html");
//             });
//         }
//     });
// });

// app.get('/login-page-html.html', (req, res) => {
//     res.sendFile(__dirname + "/views/html/login-page-html.html");
// });

// //login 
// app.post("/login-page-html.html", passport.authenticate("local", {
//     successRedirect: "/views/html/student-dashboard-html.html",
//     failureRedirect: "/login-page-html.html"
// }), function(req, res){
//     //Do nothing
// });

// //sign out
// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });

// //check to see if user is loggen in 
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     } 
//     res.redirect("/login-page-html.html");
// }

