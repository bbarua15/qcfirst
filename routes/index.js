// adapted from [5/9/2021] https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia

const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { ensureAuthenticatedStudent, ensureAuthenticatedInstructor, ensureAuthenticatedAdmin } = require("../config/auth");

// user model
const classCreate = require("../models/classCreate");
const userCreate =  require("../models/userCreate");

// home page
router.get("/", (req, res) => res.render("index"));

/*=======================================================*/

// STUDENT PAGES GET

// student dashboard
router.get("/student-dashboard", ensureAuthenticatedStudent, (req, res, next) => {
    res.render("student-dashboard",{firstName: req.user.firstName, lastName: req.user.lastName});
});

// change password student
router.get("/change-password-student", ensureAuthenticatedStudent, (req, res) => {
    res.render("change-password-student",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// class deadline student
router.get("/class-deadline-student", ensureAuthenticatedStudent, (req, res) => {
	classCreate.find({}, function(err, classes) {
		res.render("class-deadline-student", {
			firstName: req.user.firstName, lastName: req.user.lastName, classList: classes
    	})
  	})
});

// add class
router.get("/add-class", ensureAuthenticatedStudent, (req, res) => {
    res.render("add-class",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// drop class
router.get("/drop-class", ensureAuthenticatedStudent, (req, res) => {
    res.render("drop-class",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// shopping cart
router.get("/shopping-cart", ensureAuthenticatedStudent, (req, res) =>  {
    res.render("shopping-cart",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// student course dictionary
router.get("/student-course-dictionary", ensureAuthenticatedStudent, (req, res) =>  {
    classCreate.find({}, function(err, classes) {
        res.render("student-course-dictionary", {
            firstName: req.user.firstName, lastName: req.user.lastName, classList: classes
        })
    }).sort({"semester": 1})
});

/*=======================================================*/

// INSTRUCTOR PAGES GET

// instructor dashboard
router.get("/instructor-dashboard", ensureAuthenticatedInstructor, (req, res) =>  {
    res.render("instructor-dashboard",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// change password instructor
router.get("/change-password-instructor", ensureAuthenticatedInstructor, (req, res) =>  {
    res.render("change-password-instructor",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// class deadline instructor
router.get("/class-deadline-instructor", ensureAuthenticatedInstructor, (req, res) => {
	classCreate.find({}, function(err, classes) {
		res.render("class-deadline-instructor", {
			firstName: req.user.firstName, lastName: req.user.lastName, classList: classes
    	})
  	})
});

// create class
router.get("/create-class", ensureAuthenticatedInstructor, (req, res) =>  {
    res.render("create-class",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// delete class
router.get("/delete-class", ensureAuthenticatedInstructor, (req, res) =>  {
    res.render("delete-class",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// instructor course dictionary
router.get("/instructor-course-dictionary", ensureAuthenticatedInstructor, (req, res) =>  {
    classCreate.find({}, function(err, classes) {
        res.render("instructor-course-dictionary", {
            firstName: req.user.firstName, lastName: req.user.lastName, classList: classes
        })
    }).sort({"semester": 1})
});

/*=======================================================*/

// ADMIN PAGES GET

// admin dashboard
// TBA

/*=======================================================*/

// STUDENT PAGES POST

// change password student handle
router.post("/change-password-student", async (req, res) => {

    const oldPassword = req.body.old;
    const newPassword = req.body.new;
    const newConfirmPassword = req.body.confirmPassword;
    const currentPassword = req.user.password;
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;

    var errors = [];

    // check fields
    if(!oldPassword || !newPassword || !newConfirmPassword) {
        errors.push({msg: "Please fill in all the fields!"});
    }

    // see if passwords match
    if (newPassword !== newConfirmPassword) {
        errors.push({msg: "The confirm password field does not match!"});
    }

    // password strenth check
    // adapted from: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    // end adaptation
    if (regex.test(newPassword) === false) {
        errors.push({msg: "Passwords must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number!"});
    }

    // check if the old password exists in the database
    await bcrypt.compare(oldPassword, currentPassword).then((err, result) => {
        if(err) return console.log(err);
        if(!result) {
            errors.push({msg: "The password you entered does not match the one saved in our records."});
        }
    });

    // display errors
    if(errors.length > 0) {
        res.render("change-password-student", {
            errors,
            firstName,
            lastName,
            oldPassword,
            newPassword,
            newConfirmPassword
        });

        // validation passes
    } else {

        try {

            // hashing password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // stop warning
            mongoose.set('useFindAndModify', false);

            // find and update user
            await userCreate.findOneAndUpdate({_id: req.user._id}, {password: hashedPassword}, {
                new: true
            });

            console.log("Password Updated for Student");
            req.flash("success_msg", "Password successfully updated!");
            res.redirect("/change-password-student");

        } catch (err) {console.log(err);}
    }
});

/*=======================================================*/

// INSTRUCTOR PAGES POST

// create-class handle
router.post("/create-class", (req, res) => {

    const {courseNumber, semester, courseName, department, description, schedule, capacity, startDate} = req.body;
    const instructor = req.user.firstName + " " + req.user.lastName;
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;

    let errors = [];

    // check fields
    if(!courseNumber || !semester || !courseName || !department
        || !description || !schedule || !capacity || !startDate) {
        errors.push({msg: "Please fill in all the fields!"});
    }

    // courseNumber check
    let regex = /[0-9]+/
    if (regex.test(courseNumber) === false){
        errors.push({msg: "Course Number must only contain digits!"});
    }

    // semester check
    regex = /(SPRING|SUMMER|WINTER|FALL) \d\d\d\d/
    if (regex.test(semester) === false) {
        errors.push({msg: "Please enter a term in the following format: FALL/SPRING/WINTER/SUMMER [yyyy]"});
    }

    // course name check
    regex = /[a-zA-z]+/
    if(regex.test(courseName) === false) {
        errors.push({msg: "Courses must only contain letters!"});
    }

    // department check
    if(regex.test(department) === false) {
        errors.push({msg: "Departments must only contain letters!"});
    }

    // instructor name check
    if(regex.test(instructor) === false) {
        errors.push({msg: "Instructor names must only contain letters!"});
    }

    // capacity check
    regex = /[0-9]+/
    if (regex.test(capacity) === false){
        errors.push({msg: "Class capacity must only contain digits!"});
    }

    // display errors
    if(errors.length > 0) {
        res.render("create-class", {
            errors,
            firstName,
            lastName,
            courseNumber,
            semester,
            courseName,
            department,
            description,
            capacity
        });

        // validation passes
    } else {

        try {

            classCreate.findOne({courseNumber: courseNumber})
                .then(foundClass => {

                    // if class is found add another error
                    if (foundClass) {

                        errors.push({msg: "Class is already registered"});

                        res.render("create-class", {
                            errors,
                            firstName,
                            lastName,
                            courseNumber,
                            semester,
                            courseName,
                            department,
                            description,
                            capacity
                        });
                    } // end if class found

                    else {
                        //otherwise create new class and add to instructor's class list
                        let new_class = new classCreate({
                            courseNumber: courseNumber,
                            semester: semester,
                            courseName: courseName,
                            department: department,
                            instructor: instructor,
                            description: description,
                            schedule: schedule,
                            capacity: capacity
                        });

                        // save class
                        new_class.save((err, data) => {
                            if (err) return console.error(err);
                            console.log("class saved");
                            req.flash("success_msg", "Your class has been registered successfully!");
                            res.redirect("/create-class");
                        });

                        // push class onto instructor's class list
                        // adapted from: [5/13/2021]: https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-perform-classic-updates-by-running-find-edit-then-save/301541
                        userCreate.findById(req.user._id, (err, instructorID) => {
                            if (err) return console.error(err);

                            // add created class to the instructor's class array
                            instructorID.classes.push(new_class);

                            // save the updated instructor
                            instructorID.save((err, updated) => {
                                if (err) return console.error(err);
                            });
                        });
                        // end adaptation
                    }
                });

        } catch (err) {console.log(err);}
    }
});

// change password instructor handle
router.post("/change-password-instructor", async (req, res) => {

    const oldPassword = req.body.old;
    const newPassword = req.body.new;
    const newConfirmPassword = req.body.confirmPassword;
    const currentPassword = req.user.password;
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;

    var errors = [];

    // check fields
    if(!oldPassword || !newPassword || !newConfirmPassword) {
        errors.push({msg: "Please fill in all the fields!"});
    }

    // see if passwords match
    if (newPassword !== newConfirmPassword) {
        errors.push({msg: "The confirm password field does not match!"});
    }

    // password strenth check
    // adapted from: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    // end adaptation
    if (regex.test(newPassword) === false) {
        errors.push({msg: "Passwords must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number!"});
    }

    // check if the old password exists in the database
    await bcrypt.compare(oldPassword, currentPassword).then((err, result) => {
        if(err) return console.log(err);
        if(!result) {
            errors.push({msg: "The password you entered does not match the one saved in our records."});
        }
    });

    // display errors
    if(errors.length > 0) {
        res.render("change-password-instructor", {
            errors,
            firstName,
            lastName,
            oldPassword,
            newPassword,
            newConfirmPassword
        });

        // validation passes
    } else {

        try {

            // hashing password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // stop warning
            mongoose.set('useFindAndModify', false);

            // find and update user
            await userCreate.findOneAndUpdate({_id: req.user._id}, {password: hashedPassword}, {
                new: true
            });

            console.log("Password Updated for Instructor");
            req.flash("success_msg", "Password successfully updated!");
            res.redirect("/change-password-instructor");

        } catch (err) {console.log(err);}
    }
});

/*=======================================================*/

module.exports = router;
// end adaptation

