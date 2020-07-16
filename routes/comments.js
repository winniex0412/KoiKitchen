var express = require("express");
var router = express.Router({mergeParams: true});
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
	Restaurant.findById(req.params.id, function(err, restaurant){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {restaurant: restaurant});
		}
	});
	
});


// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	// lookup restaurant using ID
	Restaurant.findById(req.params.id, function(err, restaurant){
		if (err) {
			console.log(err);
			res.redirect("/restaurants");
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					req.flash("error", "Something went wrong!");
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// add dates
					var today = new Date();
					var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
					comment.date = date;
					// save comment
					comment.save();
					// connect new comment to restaurant
					restaurant.comments.push(comment);
					restaurant.save();
					console.log(comment);
					req.flash("success", "Successfully added comment!");
					res.redirect("/restaurants/" + restaurant._id);
				}
			});
		}
	});
});

// Comment EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {restaurant_id: req.params.id, comment: foundComment});
		}
	});
	
});

// Comment UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
	var newComment = {text: req.body.text, author: req.body.author, date: date};
	Comment.findByIdAndUpdate(req.params.comment_id, newComment, function(err, updatedComment){
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/restaurants/" + req.params.id);
		}
	});
});

// Comment DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted!");
			res.redirect("/restaurants/" + req.params.id);
		}
	});
});




module.exports = router;