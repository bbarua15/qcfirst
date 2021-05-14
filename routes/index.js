// adapted from [5/9/2021] https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia

const express = require("express");
const router = express.Router();
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
router.get("/class-deadline-student", ensureAuthenticatedStudent, (req, res) =>  {
    res.render("class-deadline-student",{firstName: req.user.firstName, lastName: req.user.lastName})
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
    res.render("student-course-dictionary",{firstName: req.user.firstName, lastName: req.user.lastName})
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
router.get("/class-deadline-instructor", ensureAuthenticatedInstructor, (req, res) =>  {
    res.render("class-deadline-instructor",{firstName: req.user.firstName, lastName: req.user.lastName})
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
    res.render("instructor-course-dictionary", {firstName: req.user.firstName, lastName: req.user.lastName,
       classList: classes
      }) 
  })
});

/*=======================================================*/

// ADMIN PAGES GET

// admin dashboard
// TBA

/*=======================================================*/

// STUDENT PAGES POST



/*=======================================================*/

// INSTRUCTOR PAGES POST

// create-class handle
router.post("/create-class", (req, res) => {

    const {courseNumber, semester, courseName, department, description, schedule, capacity, startDate} = req.body;
    const instructor = req.user.firstName + " " + req.user.lastName;

    console.log(req.user);

    let errors = [];

    // check fields
    if(!courseNumber || !semester || !courseName || !department
        || !description || !schedule || !capacity || !startDate) {
        errors.push({msg: "Please fill in all the fields."});
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
        res.render("create-account-page", {
            errors,
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

                        res.render("create-account-page", {
                            errors,
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

/*=======================================================*/

module.exports = router;
// end adaptation

