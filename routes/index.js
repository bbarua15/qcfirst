// adapted from [5/9/2021] https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia

const express = require("express");
const router = express.Router();
const { ensureAuthenticatedStudent, ensureAuthenticatedInstructor, ensureAuthenticatedAdmin } = require("../config/auth");

// home page
router.get("/", (req, res) => res.render("index"));

/*=======================================================*/

// STUDENT PAGES

// student dashboard
router.get("/student-dashboard", ensureAuthenticatedStudent, (req, res, next) => {
    res.render("student-dashboard-html",{firstName: req.user.firstName, lastName: req.user.lastName});
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
    res.render("student-course-dictionary-html",{firstName: req.user.firstName, lastName: req.user.lastName})
});

/*=======================================================*/

// INSTRUCTOR PAGES

// instructor dashboard
router.get("/instructor-dashboard", ensureAuthenticatedInstructor, (req, res) =>  {
    res.render("instructor-dashboard-html",{firstName: req.user.firstName, lastName: req.user.lastName})
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
    res.render("instructor-course-dictionary-html",{firstName: req.user.firstName, lastName: req.user.lastName})
});

/*=======================================================*/

// ADMIN PAGES

// admin dashboard
// TBA

/*=======================================================*/

module.exports = router;
// end adaptation

