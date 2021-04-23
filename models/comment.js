//----------------------------
var mongoose = require("mongoose");
//----------------------------

//----------------------------
//SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
//----------------------------

//----------------------------
//MODEL SETUP
module.exports = mongoose.model("Comment", commentSchema);
//----------------------------
