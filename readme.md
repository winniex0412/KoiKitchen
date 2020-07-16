https://still-beyond-78743.herokuapp.com/

# YelpCamp

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

# Each Campground has:
* Name
* Image

# Layout and Basic Styling
* Create our header and footer partials
* Andd in Bootstrap

# Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Add Mongoose
* Install and confiure mongoose
* Setup campground model
* Use campground model inside of our routes!

# Show Page
* Review the RESTful route we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment model
* Make our errors go away
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show Page
* Add siderbar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add custom stylesheet

# Auth pt.1 - Add User Model
* Install all packages needed for auth
* Define User model

# Auth pt.2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth pt.3 - Login
* Add login routes
* Add login template

# Auth pt.4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Auth pt.5 - Show/Hide Links
* Show/hide auth links in navbar correctly

# Refactor The Routes
* Use Express router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add edit routefor campgrounds
* Add link to edit page
* add update route

# Deleting Campgrounds
* Add Destroy Route
* Add Delete Button

# Authorization pt.1 - Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add edit button
* Add Update button

# Deleting Comments
* Add Destroy route
* Add Delete button

# Authorization pt.2 - Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

# Adding Full Screen Background Slider
* https://github.com/nax3t/background-slider