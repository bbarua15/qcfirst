const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// taken from [5/4/2021]: https://www.npmjs.com/package/jquery
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
// end adaption

app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
});

// loading static files
// adapted from: https://expressjs.com/en/starter/static-files.html [5/3/2021]
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

// database information
mongoose.connect("mongodb+srv://marinos:open123@cluster0.7pdeb.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });

// session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create ({
        mongoUrl: "mongodb+srv://marinos:open123@cluster0.7pdeb.mongodb.net/Cluster0?retryWrites=true&w=majority"
    })
}));

// create schema
const { Schema } = mongoose;

// schema for new Classes
const CLASS  = new Schema({
    term: {type: String,},
    courseName: {type: String},
    courseNumber: {type: Number},
    classDate: {type: Date, default: Date.now},
    classDescription: {type: String},
    capacity: {type: Number}
});

// schema for new Users
const NEWUSER = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true},
    creationDate: {type: Date, default: Date.now},
    classes: [CLASS]
});

// create model
let userCreate = mongoose.model("userCreate", NEWUSER);
let classCreate = mongoose.model("classCreate", CLASS);

// GET REQUESTS
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/html/index.html");
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/index.html");
});

app.get('/login-page-html.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/login-page-html.html");
});

app.get('/forgot-password-html.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/forgot-password-html.html");
});

app.get('/create-account-page.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/create-account-page.html");
});

app.get('/add-class.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/add-class.html");
});

app.get('/change-password-instructor.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/change-password-instructor.html");
});

app.get('/change-password-student.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/change-password-student.html");
});

app.get('/class-deadline-instructor.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/class-deadline-instructor.html");
});

app.get('/class-deadline-student.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/class-deadline-student.html");
});

app.get('/create-class.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/create-class.html");
});

app.get('/delete-class.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/delete-class.html");
});

app.get('/drop-class.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/drop-class.html");
});

app.get('/instructor-course-dictionary-html.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/instructor-course-dictionary-html.html");
});

app.get('/student-course-dictionary-html.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/student-course-dictionary-html.html");
});

app.get('/instructor-dashboard-html.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/instructor-dashboard-html.html");
});

app.get('/student-dashboard-html.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/student-dashboard-html.html");
});

app.get('/shopping-cart.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/shopping-cart.html");
});

app.get('/create-class.html', (req, res) => {
    res.sendFile(__dirname + "/views/html/create-class.html");
});

// adapted from [5/4/2021]: https://www.youtube.com/watch?v=Ud5xKCYQTjM&ab_channel=WebDevSimplified
// create a post request for the login page
app.post("/login-page-html.html", bodyParser.urlencoded({extended: false}), async function (req, res) {

    // store input data
    let entered_username = req.body.username;
    let entered_password = req.body.password;

    // get user with same name from database
    userCreate.findOne({userName: entered_username}, async function(err, foundUser){
        if(err) return console.log(err);

        // if the user is correct then check to see if passwords match
        if (foundUser) {

            console.log("user found");

            // req.session.username = user.dataUser;

            // comparing passwords
            try {

                if (await bcrypt.compare(entered_password, foundUser.password)) {

                    // check to see if the user is a student or instructor and then direct them to the appropriate page
                    let usertype = foundUser.userType;

                    // Student Case
                    if (usertype === "Student") {
                        console.log("login sucess to student");
                        res.redirect("/student-dashboard-html.html");
                    }

                    // Instructor Case
                    if (usertype === "Instructor") {
                        console.log("login sucess to instructor");
                        res.redirect("/instructor-dashboard-html.html")
                    }

                } else {
                    // display message "Incorrect username or password"
                    console.log("wrong username of password");

                    res.send("Wrong username or Password")

                    $(".password").after("<p>Wrong username or Password</p>");

                    return;
                }

            } catch (e) {console.log(e)}

        } // end if foundUser

        // if the user is not in the database
        else {

            console.log("This account does not exist, please create an account to log in")

            res.send("This account does not exist, please create an account to log in")

            $(".password").after("<p>This account does not exist, please create an account to log in</p>");

            return;
        }
    });
});

// create a post request for the create account page
app.post("/create-account-page.html", bodyParser.urlencoded({extended: false}), async function (req, res) {

    // check to see if username and password are suitable
    let regex = /^.*@login.cuny.edu$/

    console.log(req.body.username);
    console.log(regex.test(req.body.username))

    // if the regex is not secure enough
    if (regex.test(req.body.username) === false) {

        console.log("username must end with \"@login.cuny.edu\"");

        res.send("Usernames must end with \"@login.cuny.edu\"")

        //display message under to tell user criteria
        $(".password").after("<p>Usernames must end with \"@login.cuny.edu\"</p>");

        return;
    }

    // adapted from: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    // end adaptation

    // if the regex is not secure enough
    if (regex.test(req.body.password) === false) {

        console.log("password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter and one number");

        res.send("Password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter and one number")

        //display message under to tell password criteria
        $(".password").after("<p>password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter and one number</p>");

        return;
    }

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
        userCreate.findOne({username: username}, function(err, foundUser) {

            if(err) return res.json({error: "error occurred"});
            if (foundUser) return res.json({error:"Username already taken"});

            // if no error or user found then create one and save to the database
            else {

                // add attributes to new user
                let new_user = new userCreate({
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
                    res.redirect("/login-page-html.html")
                });

            }
        });

    } catch (err) {
        console.log(err);
    }

});
// end adaptation
