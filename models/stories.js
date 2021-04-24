//----------------------------
var mongoose = require("mongoose");
//----------------------------

//----------------------------
//SCHEMA SETUP
var storySchema = new mongoose.Schema({
    name: String,
    place: String,
    bodytext: String,
    date: String,
    published: Boolean,
});
//----------------------------

//----------------------------
//MODEL SETUP
module.exports = mongoose.model("Story", storySchema);
//----------------------------

