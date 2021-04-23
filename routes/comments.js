var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/noticias");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//----------------------------
//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {post: post});
        }
    });
});

//Comments Save
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            res.redirect("/posts");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/posts/" + post._id);
                }
            });
        }
    });
});

//COMMENTS - EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
        }
    });
});

//COMMENTS - UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//COMMENTS - DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comentario");
            res.redirect("/posts/" + req.params.id);
        }
    });
});
//----------------------------

module.exports = router;