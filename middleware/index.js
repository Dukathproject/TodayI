var Post = require("../models/posts");
var Comment = require("../models/comment");

//ALL THE MIDDLEWARE GOES HERE
var middlewareObj = {};
//----------------------------

//----------------------------
middlewareObj.checkPostOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err, foundPost){
            if(err){
                req.flash("error", "Publicación no encontrada.");
                res.redirect("back");
            } else {
                //does user own the post?
                if(foundPost.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "No tienes permiso para hacer eso.");
                    res.redirect("back");
                } 
            }
        });
    } else {
        req.flash("error", "Debes estar logueado para hacer eso.");
        res.redirect("back");
    }
}
//----------------------------

//----------------------------
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                } 
            }
        });
    } else {
        res.redirect("back");
    }
}
//----------------------------

//----------------------------
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //flash message
    req.flash("error", "Debes estar logueado para hacer eso.");
    res.redirect("/login");
}

module.exports = middlewareObj