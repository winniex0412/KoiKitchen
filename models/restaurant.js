var mongoose = require("mongoose");
var Comment = require("./comment");

var restaurantSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	phone: String,
	page: String,
	time: String,
	covid19_update: String,
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	date: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);