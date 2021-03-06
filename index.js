// include .env variables
require("dotenv").config();

// require necessary modules
let express = require("express");
let flash = require("connect-flash");
let layouts = require("express-ejs-layouts");
let session = require("express-session");

// include passport config
let passport = require("./config/passportConfig");

// declare express app
let app = express();

// set view engine
app.set("view engine", "ejs");

// include (use) middleware
app.use("/", express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// custom middleware - write data to locals
app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.user = req.user;
  next();
});

// include routes from controllers
app.use("/auth", require("./controllers/auth"));
app.use("/profile", require("./controllers/profile"));

// make a home route: GET /
app.get("/", (req, res) => {
  res.render("home");
});

// catch-all route - 404
app.get("*", (req, res) => {
  res.render("404");
})

// listen on specified port
app.listen(process.env.PORT || 3003, () => {
  console.log("listening");
});
