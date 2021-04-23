var express = require("express");
var router  = express.Router();
var Story = require("../models/stories");
var middleware = require("../middleware");

//INDEX - show all stories
router.get("/", function(req, res){
    // Get all stories from DB
    Story.find({}, function(err, allStories){
       if(err){
           console.log(err);
       } else {
          res.render("posts/index",{stories:allStories});
       }
    });
});

//CREATE - add new story to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to stories array
    var name = req.body.name;
    var bodytext = req.body.bodytext;
    var category = req.body.category;
    var image = req.body.image;
    var desc = req.body.description;
    var origAuthor = req.body.origAuthor;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newStory = {name: name, bodytext: bodytext, category: category, image: image, description: desc, origAuthor: origAuthor, author: author}
    // Create a new story and save to DB
    Story.create(newStory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to posts page
            //console.log(newlyCreated);
            res.redirect("/posts");
        }
    });
});

//NEW - show form to create new story
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("stories/new"); 
});

// SHOW - shows more info about one story
router.get("/:id", function(req, res){
    Story.findById(req.params.id)./*populate("comments").*/exec(function(err, foundStory){
        if(err){
            console.log(err);
        } else {
            res.render("stories/show", {stories: foundStory});
        }
    });
});

//EDIT POST ROUTE
router.get("/:id/edit", middleware.checkPostOwnership, function(req, res){
    //is user logged in
    Post.findById(req.params.id, function(err, foundPost){
        res.render("posts/edit", {post: foundPost});
    }); 
});

//UPDATE POST ROUTE
router.put("/:id", middleware.checkPostOwnership, function(req, res){
    //find and update the correct post
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("/posts");
        } else {
            //redirect somewhere (show page)
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DESTROY CATEGORIE ROUTE
router.delete("/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        } else {
            req.flash("success", "Post eliminado exitosamente.");
            res.redirect("/posts");
        }
    });
});

module.exports = router;
