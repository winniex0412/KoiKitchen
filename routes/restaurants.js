var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");
var middleware = require("../middleware");

var NodeGeocoder = require("node-geocoder");
 
var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);


// INDEX - show all restaurants
router.get("/", function(req, res){	
	if (req.query.search) {
		// fuzzy search
		const regex = new RegExp(escapeRegex(req.query.search), "gi");
		Restaurant.find({name: regex}, function(err, allRestaurants){
			if (err) {
				console.log(err);
			} else {
				if (allRestaurants.length < 1) {
					req.flash("error", "There is no match according to your search, please try again!");
				}
				res.render("restaurants/index", {restaurants: allRestaurants});
			}
		});
	} else {
		// get all restaurants from DB
		Restaurant.find({}, function(err, allRestaurants){
			if (err) {
				console.log(err);
			} else {
				res.render("restaurants/index", {restaurants: allRestaurants});
			}
		});
	}
});

// CREATE - Add new restaurant to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from form and add to restaurants array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var phone = req.body.phone;
	var page = req.body.page;
	var time = req.body.time;
	var covid19_update = req.body.covid19_update;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
	geocoder.geocode(req.body.location, function(err, data){
		if (err || !data.length) {
			req.flash("error", err.message);
			return res.redirect("back");
		}
		var lat = data[0].latitude;
		var lng = data[0].longitude;
		var location = data[0].formattedAddress;
		var newRestaurant = {name: name, price: price, image: image, phone: phone, page: page, time: time, covid19_update: covid19_update, description: description, location: location, lat: lat, lng: lng, author: author, date: date};
		// create a new restaurant adn save to DB
		Restaurant.create(newRestaurant, function(err, newlyCreated){
			if (err) {
				console.log(err);
			} else {
				// redirect back to restaurants page
				console.log(newlyCreated);
				req.flash("success", "Successfully created a restaurant!");
				res.redirect("/restaurants");
			}
		});
	});
});

// NEW - show form to create new restaurant
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("restaurants/new");
});


// SHOW - show more info about one restaurant
router.get("/:id", function(req, res){
	// find the restaurant with provided ID
	Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
		if (err) {
			console.log(err);
		} else {
			// console.log(foundRestaurant);
			// render show template with that restaurant
			res.render("restaurants/show", {restaurant: foundRestaurant});
		}
	});
});

// EDIT
router.get("/:id/edit", middleware.checkRestaurantOwnership, function(req, res){
	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		res.render("restaurants/edit", {restaurant: foundRestaurant});
	});
});

// UPDATE
router.put("/:id", middleware.checkRestaurantOwnership, function(req, res){
	// find and update the correct restaurant
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
	geocoder.geocode(req.body.location, function(err, data){
		if (err || data.length) {
			req.flash("error", "Invalid address");
			return res.redirect("back");
		}
		var lat = data[0].latitude;
		var lng = data[0].longitude;
		var location = data[0].formattedAddress;
		var newRestaurant = {name: req.body.name, price: req.body.price, image: req.body.image, phone: req.body.phone, page: req.body.page, time: req.body.time, covid19_update: req.body.covid19_update, description: req.body.description, location: location, lat: lat, lng: lng, author: req.body.author, date: date};
		Restaurant.findByIdAndUpdate(req.params.id, newRestaurant, function(err, updatedRestaurant){
			if (err) {
				req.flash("error", err.message);
				res.redirect("back");
			} else {
				req.flash("success", "Successfully Updated!")
				res.redirect("/restaurants/" + updatedRestaurant._id);
			}
		});
	});
	
	//redirect somewhere(show page)
});

// DESTROY
// router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
//    Campground.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//           res.redirect("/campgrounds");
//       }
//    });
// });
// cascade delete: when deleting a campground, the associated comments will be deleted.
// https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/9150362#questions/6168552
// https://www.youtube.com/watch?v=5iz69Wq_77k&t=857
router.delete("/:id", middleware.checkRestaurantOwnership, function(req, res, next){
	Restaurant.findByIdAndRemove(req.params.id, function(err, restaurantRemoved) {
        if (err) {
            console.log(err);
        }
        Comment.deleteMany({
			_id: {
				$in: restaurantRemoved.comments
			}
		}, function(err) { 
            if (err) {
                console.log(err);
            }
			req.flash("success", "Restaurant deleted!");
            res.redirect("/restaurants");
        });
    })
});

function escapeRegex(text) {
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

module.exports = router;