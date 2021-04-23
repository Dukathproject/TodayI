var express = require("express");
var router  = express.Router();
var Post = require("../models/posts");
var Story = require("../models/stories");
var middleware = require("../middleware");

//INDEX - show all categories
router.get("/", function(req, res){
    // Get all categories from DB
    Post.find({}, function(err, allPosts){
       if(err){
           console.log(err);
       } else {
          res.render("posts/index",{posts:allPosts});
       }
    });
});

//CREATE - add new post to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to posts array
    var name = req.body.name;
    var bodytext = req.body.bodytext;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPost = {name: name, bodytext: bodytext, image: image, description: desc, author:author}
    // Create a new post and save to DB
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to posts page
            //console.log(newlyCreated);
            res.redirect("/posts");
        }
    });
});

//NEW - show form to create new post
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("posts/new"); 
});

// SHOW - shows more info about one post
router.get("/:id", function(req, res){
    Post.findById(req.params.id)./*populate("comments").*/exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            Story.find({}, function(err, allStories){
                if(err){
                    console.log(err);
                } else {
                    res.render("posts/show", {post: foundPost, story: allStories});
                }
            });
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
