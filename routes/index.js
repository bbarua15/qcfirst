// adapted from [5/9/2021] https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia

const express = require("express");
const router = express.Router();
const { ensureAuthenticatedStudent } = require("../config/authStudent");
const { ensureAuthenticatedInstructor } = require("../config/authInstructor");
const { ensureAuthenticatedAdmin } = require("../config/authAdmin");
const { ensureAuthenticated } = require("../config/auth");

// home page
router.get("/", (req, res) => res.render("index"));

/*=======================================================*/

// STUDENT PAGES

// student dashboard
router.get("/student-dashboard", ensureAuthenticated, (req, res) => res.render("student-dashboard-html"));

// change password student
router.get("/change-password-student", ensureAuthenticated, (req, res) => res.render("change-password-student"));

// class deadline student
router.get("/class-deadline-student", ensureAuthenticated, (req, res) => res.render("class-deadline-student"));

// add class
router.get("/add-class", ensureAuthenticated, (req, res) => res.render("add-class"));

// drop class
router.get("/drop-class", ensureAuthenticated, (req, res) => res.render("drop-class"));

// shopping cart
router.get("/shopping-cart", ensureAuthenticated, (req, res) => res.render("shopping-cart"));

// student course dictionary
router.get("/student-course-dictionary", ensureAuthenticated, (req, res) => res.render("student-course-dictionary-html"));

/*=======================================================*/

// INSTRUCTOR PAGES

// instructor dashboard
router.get("/instructor-dashboard", ensureAuthenticated, (req, res) => res.render("instructor-dashboard-html"));

// change password instructor
router.get("/change-password-instructor", ensureAuthenticated, (req, res) => res.render("change-password-instructor"));

// class deadline instructor
router.get("/class-deadline-instructor", ensureAuthenticated, (req, res) => res.render("class-deadline-instructor"));

// create class
router.get("/create-class", ensureAuthenticated, (req, res) => res.render("create-class"));

// delete class
router.get("/delete-class", ensureAuthenticated, (req, res) => res.render("delete-class"));

// instructor course dictionary
router.get("/instructor-course-dictionary", ensureAuthenticated, (req, res) => res.render("instructor-course-dictionary-html"));

/*=======================================================*/

module.exports = router;
// end adaptation

