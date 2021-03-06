// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });


  app.post("/api/signup", function (req, res) {
    db.User.create({
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log("there was an error...")
        res.status(401).json(err);
      });
  });

  app.get('/logout', function (req, res) {
    res.clearCookie('connect.sid', { path: '/', domain: 'localhost' });
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
