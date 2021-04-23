var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//----------------------------
//home
router.get("/", function(req, res){
    res.render("landing");
});

//AUTH ROUTES

router.get("/register", function(req, res){
    res.render("register");
});


//Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Bienvenido/a a Stories App" + user.username);
            res.redirect("/posts");
        });
    });
});


//show login form
router.get("/login", function(req, res){
    res.render("login");
});
//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/posts",
        failureRedirect: "/login"
    }),  function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Desconectado exitosamente!");
    res.redirect("/posts");
});
//----------------------------

//----------------------------
//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//----------------------------

module.exports = router;