// adapted from: https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia, https://stackify.com/node-js-module-exports/

// middleware to make sure that a user has permission to access a specific route

function ensureAuthenticatedStudent(req, res, next) {
  if (req.user != "undefined") {
    if(req.isAuthenticated() && req.user.userType == "Student") {
      return next();
    }
  }
  req.flash("error_msg", "Access denied! Please log in to view this page");
  req.logout();
  res.redirect("/users/login");
}

function ensureAuthenticatedInstructor(req, res, next) {
  if (req.user != "undefined") {
    if(req.isAuthenticated() && req.user.userType == "Instructor") {
      return next();
    }
  }
  req.flash("error_msg", "Access denied! Please log in to view this page");
  req.logout();
  res.redirect("/users/login");
}

function ensureAuthenticatedAdmin(req, res, next) {
  if (req.user != "undefined") {
    if(req.isAuthenticated() && req.user.userType == "Admin") {
      return next();
    }
  }
  req.flash("error_msg", "Access denied! Please log in to view this page");
  req.logout();
  res.redirect("/users/login");
}

module.exports = {ensureAuthenticatedStudent, ensureAuthenticatedInstructor, ensureAuthenticatedAdmin}
