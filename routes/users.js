// adapted from [5/9/2021] https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia

const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require("passport");

// user model
const classCreate = require("../models/classCreate");
const userCreate =  require("../models/userCreate");

// login page
router.get("/login", (req, res) => res.render("login-page-html"));

// register page
router.get("/register", (req, res) => res.render("create-account-page"));

// forgot password page
router.get("/forgot", (req, res) => res.render("forgot-password-html"));

// register handle
router.post("/register", async (req, res) => {

const {firstName, lastName, username, password, confirmPassword, usertype} = req.body;

let errors = [];

// check fields
if (!firstName || !lastName || !username || !password || !confirmPassword) {
  errors.push({msg: "Please fill in all the fields"});
}

    // username check
    regex = /^.*@login.cuny.edu$/
    if (regex.test(username) === false) {
         errors.push({msg: "Usernames must end with \"@login.cuny.edu\""});
    }

    // see if passwords match
    if (password !== confirmPassword){
        errors.push({msg: "Passwords do not match"});
    }

    // password strenth check
    // adapted from: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    // end adaptation
    if (regex.test(password) === false) {
        errors.push({msg: "Passwords must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number"});
    }

    if(errors.length > 0){
      res.render("create-account-page", {
        errors,
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
      });

    } else {

      //validation pass
try {

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // see if user is already in database, otherwise display error and create a new user
        userCreate.findOne({userName: username})
        .then(foundUser => {

            // if user is found add another error
            if (foundUser) {

                errors.push({msg: "Email is already registered"});

                res.render("create-account-page", {
                errors,
                firstName,
                lastName,
                username,
                password,
                confirmPassword
      });
    } // end if user found
    
            else {
                //otherwise create new user
                let new_user = new userCreate({
                    firstName: firstName,
                    lastName: lastName,
                    userName: username,
                    password: hashedPassword,
                    userType: usertype
                });

                //console.log(new_user);

                new_user.save((err, data) => {
                    if (err) return console.error(err);
                    console.log("user saved");
                    req.flash("success_msg", "Your account has been registered successfully!");
                    res.redirect("/users/login");
                });
            }
      });
    } catch (err) {console.log(err);}
  }
});

// login handle
// adapted from [5/11/2021]: http://www.passportjs.org/docs/authenticate/
router.post("/login", (req, res, next) => {
       passport.authenticate("local", {failureFlash: true},  (err, user, info) => {

       //if error
       if (err) { return next(err); }
       // user not found
       if (!user) { 
         req.flash("error_msg", "Invalid username or password.");
         return res.redirect('/users/login'); 
         }

      // establish session in application
       req.logIn(user, function(err) {
         // error
         if (err) { return next(err); }
         // if user is student
         if(user.userType == "Student") {
          res.redirect("/student-dashboard");
         }
         // if user is instructor
        if(user.userType == "Instructor") {
           res.redirect("/instructor-dashboard");
         }
         // if user is admin
         if(user.userType == "Admin") {
           res.redirect("/admin-dashboard");
         }
      });
   })(req, res, next);
});

// logout handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You have logged out successfully.");
  res.redirect("/users/login");
});

module.exports = router;
// end adaptation
