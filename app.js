require("dotenv").config();

var express          = require("express"),
	app              = express(),
	bodyParser       = require("body-parser"),
	mongoose         = require("mongoose"),
	flash            = require("connect-flash"),
	passport         = require("passport"),
	LocalStrategy    = require("passport-local"),
	medthodOverride  = require("method-override"),
	Restaurant       = require("./models/restaurant"),
	Comment          = require("./models/comment"),
	User             = require("./models/user"),
	seedDB           = require("./seeds"),
	port             = process.env.PORT || 3000;

// requiring routes
var restaurantRoutes = require("./routes/restaurants"),
	commentRoutes    = require("./routes/comments"),
	indexRoutes      = require("./routes/index");
	

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var url = process.env.DATABASEURL || 'mongodb://localhost:27017/koikitchen';
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(medthodOverride("_method"));
app.use(flash());

// seed the database
// seedDB();

// passport configuration
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes); // prefix that can be added to routes
app.use("/restaurants/:id/comments", commentRoutes);


var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("The KoiKitchen Server Has Started!");
});