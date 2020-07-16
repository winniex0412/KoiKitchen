var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Restaurant = require("../models/restaurant");

// ROOT ROUTES
router.get("/", function(req, res){
	res.render("landing");
});


// register route
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, avatar: req.body.avatar, email: req.body.email});
	User.register(newUser, req.body.password, function(err, user){
		if (err) {
			req.flash("error", err.message);
			return res.redirect("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to KoiKitchen, " + user.username);
			res.redirect("/restaurants");
		});
	});
});

// login route
router.get("/login", function(req, res){
	res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/restaurants",
	failureRedirect: "/login"
}), function(req, res){
});

// logout
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/restaurants");
});

// user porfile
router.get("/users/:id", function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if (err) {
			console.log(err);
			res.redirect("/");
		} else {
			Restaurant.find().where("author.id").equals(foundUser._id).exec(function(err, restaurants){ 
				if (err) {
					console.log(err);
					res.redirect("/");
				} else {
					res.render("users/show", {user: foundUser, restaurants: restaurants});
				}
			});
			
		}		
	});
});

module.exports = router;