// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  // app.get("/", function (req, res) {
  //   if (req.user) {
  //     res.redirect("/dashboard");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/html/main.html"));
  // });

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/main.html"));
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
  });

  app.get("/pharmacy", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/pharmacy.html"));
  })

};