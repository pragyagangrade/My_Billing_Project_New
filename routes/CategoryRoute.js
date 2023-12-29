var express = require("express");
var router = express.Router();
var Controllers = require("../controller/indexController");

router.post(
  "/CreateCategory",
  Controllers.CategoryControllerAPI.CreateCategory
);



module.exports = router;
