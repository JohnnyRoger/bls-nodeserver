const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
//* Authentication Router
const loginRouter = require("./routes/auth/login");
const registerRouter = require("./routes/auth/register");
const retrieveUserRouter = require("./routes/auth/retrieveuser");
//* Location Router
const saveLocationRouter = require("./routes/location/savelocation");
const retrieveLocationRouter = require("./routes/location/retrievelocation");
//* Grower Router
const saveGrowerRouter = require("./routes/grower/savegrower");
const retrieveGrowerRouter = require("./routes/grower/retrievegrower");
//* Reader Router
const saveReaderRouter = require("./routes/reader/savereader");
const retrieveReaderRouter = require("./routes/reader/retrievereader");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//* Authentication Path
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/retrieveuser", retrieveUserRouter);
//* Location Path
app.use("/savelocation", saveLocationRouter);
app.use("/retrievelocation", retrieveLocationRouter);
//* Grower Path
app.use("/savegrower", saveGrowerRouter);
app.use("/retrievegrower", retrieveGrowerRouter);
//* Reader Path
app.use("/savereader", saveReaderRouter);
app.use("/retrievereader", retrieveReaderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  console.log(err);
});

module.exports = app;
