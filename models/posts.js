//----------------------------
var mongoose = require("mongoose");
//----------------------------

//----------------------------
//SCHEMA SETUP
var postSchema = new mongoose.Schema({
    name: String,
    bodytext: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
//----------------------------

//----------------------------
//MODEL SETUP
module.exports = mongoose.model("Post", postSchema);
//----------------------------

