var express = require("express");
var router = express.Router();
// var passport = require("passport");
// var User = require("../models/user");
var Story = require("../models/stories");

//----------------------------
//INDEX - show all stories
router.get("/", function(req, res){
    // Get all stories from DB
    Story.find({}, function(err, allStories){
       if(err){
           console.log(err);
       } else {
          res.render("stories/show",{stories:allStories});
       }
    });
});

//CREATE - add new story to DB
router.post("/stories", function(req, res){
    // get data from form and add to stories array
    var name = req.body.name;
    var bodytext = "Today I " + req.body.bodytext;
    var place = req.body.place;

    let newDate = new Date();
    let parsedDate = {
        day: newDate.getDate(),
        month: (newDate.getMonth() + 1),
        year: newDate.getFullYear()
    };
    var date = parsedDate.year + "/" + parsedDate.month + "/" + parsedDate.day;
    var published = false;
    
    var newStory = {name: name, bodytext: bodytext, place: place, date: date, published: published}
    // Create a new story and save to DB
    Story.create(newStory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to posts page
            res.redirect("/");
        }
    });
});
//home
// router.get("/", function(req, res){
//     res.render("stories/show");
// });

//AUTH ROUTES

// router.get("/register", function(req, res){
//     res.render("register");
// });


//Handle sign up logic
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             req.flash("error", err.message);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             req.flash("success", "Bienvenido/a a Stories App" + user.username);
//             res.redirect("/stories");
//         });
//     });
// });


//show login form
// router.get("/login", function(req, res){
//     res.render("login");
// });
//handling login logic
// router.post("/login", //passport.authenticate("local",
//     {
//         successRedirect: "/stories",
//         failureRedirect: "/login"
//     }),  function(req, res){
// });

//logout route
// router.get("/logout", function(req, res){
//     req.logout();
//     req.flash("success", "Desconectado exitosamente!");
//     res.redirect("/stories");
// });
//----------------------------

//----------------------------
//Middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }
//----------------------------

module.exports = router;