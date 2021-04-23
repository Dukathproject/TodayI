//----------------------------
var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    passport          = require("passport"),
    flash             = require("connect-flash"),
    LocalStrategy     = require("passport-local"),
    methodOverride    = require("method-override"),
    Post              = require("./models/posts"),
//  Comment           = require("./models/comment"),
    User              = require("./models/user"),
    Story            = require("./models/stories"),
//  commentRoutes     = require("./routes/comments"),
    postRoutes        = require("./routes/posts"),
    storyRoutes      = require("./routes/stories"),
    indexRoutes       = require("./routes/index");
//----------------------------

//----------------------------
//get logged in name from session
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});



//Declare Atlas address
const mongoDb_URI = "mongodb+srv://dukathTest:DukathProject1234@clustermongo-vw7vk.mongodb.net/storiesapp?retryWrites=true&w=majority";
//Connect to mongo db atlas  | || "mongodb://localhost/cat_app"| "mongodb://localhost/cat_app"
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
app.use(flash());
//----------------------------

//----------------------------
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is the third app i'm doing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//----------------------------

//----------------------------
//activate routes from imported files
app.use("/", indexRoutes);
//app.use("/posts/:id/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/stories", storyRoutes);
//----------------------------

//----------------------------
// server listen
app.listen(3000, function(req, res) {
    console.log("Stories App server has started!");
});
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Stories App server has started!");
// });
//----------------------------