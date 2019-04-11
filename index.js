// include .env variables
require("dotenv").config();

// require necessary modules
let express = require("express");
let layouts = require("express-ejs-layouts");

// declare express app
let app = express();

// set view engine
app.set("view engine", "ejs");

// include (use) middleware
app.use(layouts);

// include routes from controllers


// make a home route: GET /
app.get("/", (req, res) => {
  res.render("home");
});

// listen on specified port
app.listen(process.env.PORT || 3000);
