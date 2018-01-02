require("dotenv").config();
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const app = express();
app.use(favicon(path.join(__dirname, "favicon.ico")));
//connect to mongoose
/* mongoose.connect(process.env.DB_URI); */

const port = process.env.PORT || 8080;
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
if (process.env.NODE_ENV === "development") {
  const devConfig = require("./webpack.config.dev.js");
  const compiler = webpack(devConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: devConfig.output.publicPath
    })
  );

  app.use(logger("dev"));
} else {
  app.use(logger("combined"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser);
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
/* app.use(passport.initialize());
app.use(passport.session());
const User = require("./models/user");
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
  // res.send("hi");
});

app.listen(port, function() {
  console.log(
    `==> 🌎  listening on port ${port}! Open up http://localhost:${port}/ in your browser. \n`
  );
});
