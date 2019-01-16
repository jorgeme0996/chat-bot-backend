const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        methodOverride  = require("method-override"),
        User            = require("./models/user"),
        port            = 4000;

mongoose.connect("mongodb://jorgeme0996:jorge007@ds053390.mlab.com:53390/chat-bot", {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require("express-session")({
    secret: "Payton es la mejor",
    resave: false,
    saveUninitialized: false
}));

app.get("/", function(req, res){
    res.json('Binvenido')
});

//Register User
app.post("/register", function(req, res){
    const newUser = new User ({
        name: req.body.name,
        lastName: req.body.lastName,
        username:req.body.username
    });
    const newPassword = req.body.password;
    User.register(newUser, newPassword, function(error, newUser){
        if(error){
            res.status(500).json(error);
        } else {
            res.status(201).json(newUser);
        }
    })
});

//Login
app.post("/login", passport.authenticate("local") ,function(req, res){
    res.json('true')
});

app.listen(port, function(){
    console.log("Esta vivo ")
});

// process.env.PORT,process.env.IP