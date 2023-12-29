
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');

var ProductRoute = require('./routes/ProductRoute');
var CategoryRoute = require('./routes/CategoryRoute');

// Setup DB Connection
require('./database/dbconnection');

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));



// CORS Middleware
app.use(cors());


app.use('/', ProductRoute);
app.use('/', CategoryRoute);


app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*", "http://34.202.71.4:4000/", {
    reconnect: true,
  });
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept, X-Custom-Header,Authorization"
  );
  res.setHeader("Content-Type", "text/plain");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  } else {
    return res.send({ success: "0", message: "Hello World" });
  }
});

app.listen(4000, function () {
  console.log("Node app is running on port 4000");
});


module.exports = app;
