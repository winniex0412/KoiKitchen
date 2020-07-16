// all the middleware goes here
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkRestaurantOwnership = function(req, res, next){
	// is user logged in
	if(req.isAuthenticated()) {
		Restaurant.findById(req.params.id, function(err, foundRestaurant){
			if (err) {
				req.flash("error", "Restaurant not found!");
				res.redirect("back");
			} else {
				// does user owen the restaurant?
				// console.log(foundRestaurant.author.id); // a mongoose object
				// console.log(req.user._id); // a string
				if (foundRestaurant.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	// is user logged in
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err) {
				res.redirect("back");
			} else {
				// does user owen the comment?
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
}

module.exports = middlewareObj;