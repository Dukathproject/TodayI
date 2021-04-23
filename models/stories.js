//----------------------------
var mongoose = require("mongoose");
//----------------------------

//----------------------------
//SCHEMA SETUP
var storySchema = new mongoose.Schema({
    name: String,
    bodytext: String,
    image: String,
    description: String,
    category: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        username: String
    },
});
//----------------------------

//----------------------------
//MODEL SETUP
module.exports = mongoose.model("Story", storySchema);
//----------------------------

