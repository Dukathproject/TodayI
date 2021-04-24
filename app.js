//----------------------------
var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    methodOverride    = require("method-override"),
    Story            = require("./models/stories"),
    indexRoutes       = require("./routes/index");
//----------------------------

//----------------------------

//Declare Atlas address
const mongoDb_URI = "mongodb+srv://dukathTest:DukathProject1234@clustermongo-vw7vk.mongodb.net/todayi?retryWrites=true&w=majority";

mongoose.connect(mongoDb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Check message
mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!");
});
//use body-parser
app.use(bodyParser.urlencoded({extended: true}));
//ejs extension cut
app.set("view engine", "ejs");
//use custom css
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//----------------------------


//----------------------------

//activate routes from imported files
app.use("/", indexRoutes);

//----------------------------
// server listen
app.listen(3000, function(req, res) {
    console.log("Today I server has started!");
});
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Today I server has started!");
// });
//----------------------------