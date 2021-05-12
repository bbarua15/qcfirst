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

/*

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

*/