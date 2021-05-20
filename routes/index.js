// adapted from [5/9/2021] https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia

const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { ensureAuthenticatedStudent, ensureAuthenticatedInstructor, ensureAuthenticatedAdmin } = require("../config/auth");

// user model
const classCreate = require("../models/classCreate");
const userCreate =  require("../models/userCreate");
const userHistory =  require("../models/userHistory");

// home page
router.get("/", (req, res) => res.render("index"));

/*=======================================================*/

// STUDENT PAGES GET

// student dashboard
router.get("/student-dashboard", ensureAuthenticatedStudent, (req, res, next) => {
    res.render("student-dashboard",{firstName: req.user.firstName, lastName: req.user.lastName, classList: req.user.classes});
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
        });
    })
});

// add class
// adapted from [5/17/2021]: https://docs.mongodb.com/manual/reference/method/db.collection.distinct/
router.get("/add-class", ensureAuthenticatedStudent, async (req, res) => {
    var selectedDepart = "";
    if (req.query.dep) {
        selectedDepart = req.query.dep;
    }

    var departmentList = {};
    var classList = {};

    // find department list
    await classCreate.distinct("department", async (err, departmentResults) => {
        if (err) console.log(err);
        if (departmentList) {
            departmentList = await departmentResults;
        }
    });
    // end adaptation

    // find class List
    if (selectedDepart && selectedDepart != "") {
        classList = await classCreate.find({ department: selectedDepart }).exec();

    } else {
        await classCreate.find({}, async (err, classes) => {
            if (err) console.log(err);
            classList = await classes;
        });
    }

    await res.render("add-class", {
        firstName: req.user.firstName, lastName: req.user.lastName, classList, departmentList, selectedDepart
    });
});

// drop class
router.get("/drop-class", ensureAuthenticatedStudent, (req, res) => {
    res.render("drop-class",{firstName: req.user.firstName, lastName: req.user.lastName, classList: req.user.classes})
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
router.get("/instructor-dashboard", ensureAuthenticatedInstructor, async (req, res) =>  {
    let userList = {};
    let rosterList = [];
    let courseNo = req.query.rosterSearch;
    let isFound = false;

    if (courseNo && courseNo != "" && req.user && req.user.classes) {
      req.user.classes.forEach((_class) => {
        if (_class.courseNumber == courseNo) {
          isFound = true;
        }
      });
    }
    res.render("instructor-dashboard",{firstName: req.user.firstName, lastName: req.user.lastName, classList: req.user.classes, userList, rosterList})
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
    res.render("delete-class",{firstName: req.user.firstName, lastName: req.user.lastName, classList: req.user.classes})
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
router.get("/admin-dashboard", ensureAuthenticatedAdmin, (req, res) =>  {
    res.render("admin-dashboard",{firstName: req.user.firstName, lastName: req.user.lastName})
});

// user search
router.get("/user-search", ensureAuthenticatedAdmin, (req, res) =>  {
    let userList = {};
    res.render("user-search",{firstName: req.user.firstName, lastName: req.user.lastName, classList: req.user.classes, userList});
});

// available courses
router.get("/available-courses", ensureAuthenticatedAdmin, (req, res) =>  {
    classCreate.find({}, function(err, classes) {
        res.render("available-courses", {
            firstName: req.user.firstName, lastName: req.user.lastName, classList: classes
        })
    }).sort({"semester": 1})
});

// search query
router.get("/search-history", ensureAuthenticatedAdmin, (req, res) =>  {
    let searchResults = {};
    res.render("search-history",{firstName: req.user.firstName, lastName: req.user.lastName, searchResults})
});


// change password admin
router.get("/change-password-admin", ensureAuthenticatedAdmin, (req, res) => {
    res.render("change-password-admin",{firstName: req.user.firstName, lastName: req.user.lastName})
});

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

    // password strength check
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

// student course dictionary handle
// adapted from [5/15/2021]: https://docs.mongodb.com/manual/reference/operator/query/regex/, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions, https://www.semicolonworld.com/question/47801/node-js-and-mongoose-regex-query-on-multiple-fields
router.post("/student-course-dictionary", async (req, res) => {

    let firstName = req.user.firstName;
    let lastName = req.user.lastName;

// store search result
    let searchResult = req.body.search;
    let regex = new RegExp(searchResult, "i");

    await classCreate.find().or([
        {courseNumber: {$regex: regex}},
        {semester: {$regex: regex}},
        {courseName: {$regex: regex}},
        {department: {$regex: regex}},
        {instructor: {$regex: regex}},
        {description: {$regex: regex}},
        {schedule: {$regex: regex}}]).exec((err, classList) => {
        if(err) return console.log(err);

        // save the search result
        let userhistory = new userHistory({history: searchResult, userEmail: req.user.userName, results: classList});

        userhistory.save((err, saved) => {
            if (err) return console.log(err);
        });

        res.render("student-course-dictionary", {
            classList,
            firstName,
            lastName
        });
    });
});
// end adaptation

// drop class handle
// adapted from: [5/17/2021]: https://stackoverflow.com/questions/40588709/how-to-remove-object-from-array-using-mongoose,https://stackoverflow.com/questions/50822205/accessing-object-inside-array, https://stackoverflow.com/questions/42964094/mongoose-query-array-of-objects-by-id
router.post("/drop-class", async (req, res) => {

    let firstName = req.user.firstName;
    let lastName = req.user.lastName;
    let classList = req.user.classes;
    let errors = [];

    // store course value
    let courseToDrop = req.body.dropField;

    // see if class exists
    await userCreate.findOne({_id: req.user.id, "classes.courseNumber": courseToDrop}, {"classes.$": 1}, (err, found) => {

        // if error
        if(err) return console.log(err);

        // if result is not in student's class list
        if(!found) {
            errors.push({msg: "The course number you entered does not match the one saved in our records."});
        }
    });

    // display errors
    if(errors.length > 0) {
        res.render("drop-class", {
            errors,
            firstName,
            lastName,
            classList
        });
        return;
    }

    // drop class from user
    userCreate.updateOne({ _id: req.user.id }, { "$pull": { "classes": { "courseNumber": courseToDrop } }}, { safe: true, multi:true }, (err, obj) => {

        // if error
        if (err) return console.log(err);

        // if result is not in student's class list
        if (!obj) {
            errors.push({msg: "The course number you entered does not match the one saved in our records."});

            res.render("drop-class", {
                errors,
                classList,
                firstName,
                lastName
            });
        }

        // if dropped
        if (obj) {
            req.flash("success_msg", "Class dropped successfully!");
            res.redirect("/drop-class");
        }
    });
});
// end adaptation

// add-class handle [5/18/2021]
// adapted from: https://stackoverflow.com/questions/42964094/mongoose-query-array-of-objects-by-id, https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-perform-classic-updates-by-running-find-edit-then-save/301541, https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
router.post("/add-class", async (req, res) => {

    let department = req.body.department;
    let courseNumber = req.body.courseNumber;
    let authenticatedFlag = true;

    // find the class
    classCreate.findOne({courseNumber: courseNumber}, async (err, found) => {

        // if error
        if (err) return console.log(err);

        // if class not found display message
        if (!found) {
            req.flash("error_msg", "Class does not exist!");
            res.redirect("/add-class");
        }

        // if the class was found
        if (found) {

            // store values to check flags
            let todayDate = new Date().toString().substring(0, 15);
            let deadlineDate = new Date(found.startDate).toString().substring(0, 15);
            let currentEnrolled = parseInt((found.rosterStudent).length);

            //if the class deadline date is greater than the current date

            console.log(todayDate);
            console.log(deadlineDate);

            if (deadlineDate < todayDate) {
                authenticatedFlag = false;
                req.flash("error_msg", "The enrollment date deadline has already passed!");
                res.redirect("/add-class");
                return;
            }

            // if will be greater than
            if (currentEnrolled >= found.capacity) {
                authenticatedFlag = false;
                req.flash("error_msg", "Course full!");
                res.redirect("/add-class");
                return;
            }

            // see if student is already enrolled in that class
            await userCreate.findOne({_id: req.user.id, "classes.courseName": found.courseName}, {"classes.$": 1}, (err, found) => {

                if (err) return console.log(err);

                if (found) {
                    authenticatedFlag = false;
                    req.flash("error_msg", "You already have this course in your class schedule!");
                    res.redirect("/add-class");
                    return;
                }
            });

            // if all vaidations pass:
            if (authenticatedFlag) {

                // stop warning
                mongoose.set('useFindAndModify', false);

                // add student to class student roster
                const studentName = req.user.firstName + " " + req.user.lastName;
                classCreate.findOneAndUpdate({courseNumber: courseNumber}, {$push: {rosterStudent: studentName}}, {new: true}, (err, updated) => {
                    if (err) return console.log(err);
                });

                // add class to student classes array
                userCreate.findOneAndUpdate({_id: req.user._id}, {$push: {classes: found}}, {new: true}, (err, updated) => {
                    if (err) return console.log(err);

                    if (updated) {
                        console.log("class added");
                        req.flash("success_msg", "Class successfully added!");
                        res.redirect("/add-class");
                        return;
                    }
                });
            }
        } // end found
    });
});
// end adaptation

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
                            capacity: capacity,
                            startDate: startDate
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

// instructor course dictionary handle
// adapted from [5/15/2021]: https://docs.mongodb.com/manual/reference/operator/query/regex/, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions, https://www.semicolonworld.com/question/47801/node-js-and-mongoose-regex-query-on-multiple-fields
router.post("/instructor-course-dictionary", async (req, res) => {

    let firstName = req.user.firstName;
    let lastName = req.user.lastName;

// store search result
    let searchResult = req.body.search;
    let regex = new RegExp(searchResult, "i");

    await classCreate.find().or([
        {courseNumber: {$regex: regex}},
        {semester: {$regex: regex}},
        {courseName: {$regex: regex}},
        {department: {$regex: regex}},
        {instructor: {$regex: regex}},
        {description: {$regex: regex}},
        {schedule: {$regex: regex}}]).exec((err, classList) => {
        if(err) return console.log(err);

        // save the search result
        let userhistory = new userHistory({history: searchResult, userEmail: req.user.userName, results: classList});

        userhistory.save((err, saved) => {
            if (err) return console.log(err);
        });

        res.render("instructor-course-dictionary", {
            classList,
            firstName,
            lastName
        });
    });
});
// end adaptation

// delete class handle
// adapted from: [5/16/2021]: https://stackoverflow.com/questions/40588709/how-to-remove-object-from-array-using-mongoose,https://stackoverflow.com/questions/50822205/accessing-object-inside-array, https://stackoverflow.com/questions/42964094/mongoose-query-array-of-objects-by-id
router.post("/delete-class", async (req, res) => {

    let firstName = req.user.firstName;
    let lastName = req.user.lastName;
    let classList = req.user.classes;
    let errors = [];

    // store course value
    let courseToDelete = req.body.deleteField;

    // see if class exists
    await userCreate.findOne({_id: req.user.id, "classes.courseNumber": courseToDelete}, {"classes.$": 1}, (err, found) => {

        // if error
        if(err) return console.log(err);

        // if result is not in instructor's class list
        if(!found) {
            errors.push({msg: "The course number you entered does not match the one saved in our records."});
        }
    });

    // display errors
    if(errors.length > 0) {
        res.render("delete-class", {
            errors,
            firstName,
            lastName,
            classList
        });
        return;
    }

    // delete from Instructor
    userCreate.updateOne({ _id: req.user.id }, { "$pull": { "classes": { "courseNumber": courseToDelete } }}, { safe: true, multi:true }, async (err, obj) => {

        // if error
        if (err) return console.log(err);

        // if result is not in instructor's class list
        if (!obj) {
            errors.push({msg: "The course number you entered does not match the one saved in our records."});

            res.render("delete-class", {
                errors,
                classList,
                firstName,
                lastName
            });
        }

        if (obj) {

            // remove class from all students classes array after it's deleted
            await userCreate.updateMany({}, { "$pull": { "classes": { "courseNumber": courseToDelete } }}, { safe: true, multi:true }, (err, obj) => {
                console.log("Class deleted in db from all students");

            });

            // delete from class list
            classCreate.deleteOne({courseNumber: courseToDelete}, (err, found) => {
                if(err) return console.log(err);
                console.log("Class deleted");
                req.flash("success_msg", "Class deleted successfully!");
                res.redirect("/delete-class");
            });
        }
    });
});
// end adaptation

/*=======================================================*/

// ADMIN POSTS

// user-search handle
router.post("/user-search", async (req, res) => {

    const firstName = req.user.firstName;
    const lastName = req.user.lastName;
    let usernameInput = req.body.userSearch;

    await userCreate.findOne({userName: usernameInput}, (err, userList) => {

        // if there is an error
        if(err) return console.log(err);

        if (!userList) {
            req.flash("error_msg", "Username not in database!");
            res.redirect("/user-search");
        }

        // otherwise if list is found
        if (userList) {

            res.render("user-search", {
                firstName,
                lastName,
                userList
            });
        }
    });
});

// search-history handle
router.post("/search-history", async (req, res) => {

    const firstName = req.user.firstName;
    const lastName = req.user.lastName;
    let usernameInput = req.body.searchHistory;

    await userHistory.findOne({userEmail: usernameInput}, (err, searchResults) => {

        // if there is an error
        if(err) return console.log(err);

        if (!searchResults) {
            req.flash("error_msg", "Username not in database!");
            res.redirect("/search-history");
        }

        // otherwise if list is found
        if (searchResults) {
            res.render("search-history", {
                firstName,
                lastName,
                searchResults
            });
        }
    });
});

// change password admin handle
router.post("/change-password-admin", async (req, res) => {

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
        res.render("change-password-admin", {
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

            console.log("Password Updated for Admin");
            req.flash("success_msg", "Password successfully updated!");
            res.redirect("/change-password-admin");

        } catch (err) {console.log(err);}
    }
});

// available courses search handle
router.post("/available-courses", async (req, res) => {

    let firstName = req.user.firstName;
    let lastName = req.user.lastName;

// store search result
    let searchResult = req.body.search;
    let regex = new RegExp(searchResult, "i");

    // displays classes based on inputted value in search bar
    await classCreate.find().or([
        {courseNumber: {$regex: regex}},
        {semester: {$regex: regex}},
        {courseName: {$regex: regex}},
        {department: {$regex: regex}},
        {instructor: {$regex: regex}},
        {description: {$regex: regex}},
        {schedule: {$regex: regex}}]).exec((err, classList) => {
        if(err) return console.log(err);

        // save the search result
        let userhistory = new userHistory({history: searchResult, userEmail: req.user.userName, results: classList});

        userhistory.save((err, saved) => {
            if (err) return console.log(err);
        });

        res.render("available-courses", {
            classList,
            firstName,
            lastName
        });
    });
});

/*=======================================================*/

module.exports = router;
// end adaptation