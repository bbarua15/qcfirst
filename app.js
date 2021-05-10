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
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/add-class.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/change-password-instructor.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/change-password-instructor.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/change-password-student.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/change-password-student.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/class-deadline-instructor.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/class-deadline-instructor.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/class-deadline-student.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/class-deadline-student.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/create-class.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/create-class.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/delete-class.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/delete-class.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/drop-class.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/drop-class.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/instructor-course-dictionary-html.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/instructor-course-dictionary-html.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/student-course-dictionary-html.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/student-course-dictionary-html.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/instructor-dashboard-html.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/instructor-dashboard-html.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/student-dashboard-html.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/student-dashboard-html.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/shopping-cart.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/shopping-cart.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
});

app.get('/create-class.html', (req, res) => {
    if (req.session.loggedin = true) {
        res.sendFile(__dirname + "/views/html/create-class.html");
    }
    else {
        console.log("Please login into your respective account")
        res.sendFile(__dirname + "/views/html/login-page-html.html");
    }
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
            req.session.user = {
                username: user.email,
            }

            console.log("user found");

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

                    else if (!req.session.user) {
                        res.redirect('/login-page-html.html');
                    }

                } else {
                    // display message "Incorrect username or password"
                    console.log("wrong username of password");

                    $(".password").after("<p>Wrong username or Password</p>");

                    return;
                }

            } catch (e) {console.log(e)}

        } // end if foundUser

        // if the user is not in the database
        else {

            console.log("This account does not exist, please create an account to log in");

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

        //display message under to tell user criteria
        $(".password").after("<p>Usernames must end with \"@login.cuny.edu\"</p>");

        return;
    }

    // adapted from: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

    if (req.body.password != req.body["confirm-password"]){
        console.log("passwords must match");
        return;
    }

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    // end adaptation

    // if the regex is not secure enough
    if (regex.test(req.body.password) === false) {

        console.log("password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter and one number");

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

// add class post
app.post("/add-class.html", bodyParser.urlencoded({extended: false}), async function (req, res) {

    // check to see if a number was entered
    let regex = /[0-9]/;
    if (!regex.test(req.body.cournum)){
        // display error
        //$(".cournum").after("<p>Please enter a value course number</p>");
        return
    }

    // store values from form
    let course = req.body.course;
    let courseNum = req.body.cournum;

    // search database for these values and then change the
    // table to contain the rows associated with lectures
    classCreate.findAll({courseName: course, courseNumber: courseNum}, function(err, array) {

        // if error display error
        if(err) console.log(err);
            //$(".cournum").after("<p>Unable to load courses, please try a different value</p>");

        // otherwise display all available courses in table
        else {
            //TBA
        }
    });
});

app.post("/drop-class.html", bodyParser.urlencoded({extended: false}), async function (req, res) {

});

app.post("/create-class.html", bodyParser.urlencoded({extended: false}), async function (req, res) {

    // data valdiation for new class
    let regex = /(spring|summer|winter|fall) \d\d\d\d/i
    if (!regex.test(req.body.term)){
        console.log("Please enter a term in the following format: [Season] [yyyy]");
        return;
    }

    regex = /[a-z]/i
    if(!regex.test(req.body.courname)){
        console.log("The course name contains non-letter characters");
        return;
    }

    regex = /0-9/
    if(!regex.test(req.body.cournum)){
        console.log("the course number must only contain numbers");
        return;
    }

    if(!regex.test(req.body.capac)){
        console.log("the capacity should be an integer");
        return;
    }

    // store values for new class:
    let term = req.body.term;
    let courseName = req.body.courname;
    let courseNumber = req.body.cournum;
    let time = req.body.time;
    let desc = req.body.desc;
    let capacity = req.body.capac;

    // store values in database
    let new_class = new classCreate({
        term: term,
        courseName: courseName,
        courseNumber: courseNumber,
        classDate: time,
        classDescription: desc,
        capacity: capacity
    });

    console.log(new_class);

    new_class.save((err, data) => {
        if (err) return console.error(err);
        console.log("class Created");
    });

});

app.post("/delete-class.html", bodyParser.urlencoded({extended: false}), async function (req, res) {


});

app.post("/change-password-student.html", bodyParser.urlencoded({extended: false}), async function (req, res) {

    // get user information from session
    //TBA

    // validate password information
    let oldPassword = req.body.old;
    let newPassword = req.body.new;
    let confirmPassword = req.body["confirm-password"];

    if (newPassword != confirmPassword){
        console.log("The passwords you entered do not match, please try again");

        //TBA

        return;
    }

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    // end adaptation

    // if the regex is not secure enough
    if (regex.test(newPassword) === false) {

        console.log("password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter and one");_

        //display message under to tell password criteria
        $(".password").after("<p>password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter and one number</p>");

        return;
    }

    //if successful validation then replace password in database
    try {

        // hashing new password
        const newHashedPassword = await bcrypt.hash(req.body.password, 10);

        // replacing the old password

        // need to get user's logged in id

        // userCreate.findOneAndUpdate({_id: [their id]}, {password: newHashedPassword}, { new: true }, function (err, userToUpdate){
        // if (err) return console.error(err);
        // done(null, userToUpdate);
        // });

        // confirmation message
        console.log("Password Sucessfully changed");

    } catch(err){console.log(err)};
});

app.post("/change-password-instructor.html", bodyParser.urlencoded({extended: false}), async function (req, res) {


});
