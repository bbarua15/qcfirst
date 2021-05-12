// adapted from: https://www.youtube.com/watch?v=6FOq4cUdH8k&ab_channel=TraversyMedia

// middleware to make sure that a user has permission to access a specific route
module.exports = {

  ensureAuthenticated: function(req, res, next) {
    if (req.user.userType == "Student") {
        if(req.isAuthenticated()) {
        return next();
      }
    }
    req.flash("error_msg", "Access denied! Please log in to view this page");
    res.redirect("/users/login");
  }

}