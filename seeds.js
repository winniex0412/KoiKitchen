var mongoose = require("mongoose");
var Restaurant = require("./models/restaurant");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80",
		description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
	},
	{
		name: "Starry Night",
		image: "https://images.unsplash.com/photo-1531097517181-3de20fd3f05c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
		description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
	},
	{
		name: "Woodside",
		image: "https://images.unsplash.com/photo-1526011881888-8dba3f788ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
		description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
	}
];

function seedDB(){
	// Remove all restaurants
	Restaurant.deleteMany({}, function(err){
		if (err) {
			console.log(err);
		}
		console.log("removed restaurant!");
		// add a few restaurants
		data.forEach(function(seed){
			Restaurant.create(seed, function(err, restaurant){
				if (err) {
					console.log(err);
				} else {
					console.log("added a restaurant");
					// create a comment
					Comment.create(
						{
							text: "Great place, wish there was internet",
							author: "Homer"
						}, function(err, comment){
							if (err) {
								console.log(err);
							} else {
								restaurant.comments.push(comment);
								restaurant.save();
								console.log("Created new comment");
							}
						});
				}
			});
		});
	});
	
	
	
	// add a few comments
}

module.exports = seedDB;

