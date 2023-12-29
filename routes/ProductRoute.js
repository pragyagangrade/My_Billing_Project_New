var express = require("express");
var router = express.Router();
var Controllers = require("../controller/indexController");

router.post(
  "/CreateProduct",
  Controllers.ProductControllerAPI.CreateProduct
);
router.get(
  "/GetallProduct",
  Controllers.ProductControllerAPI.GetallProduct
);
router.patch(
  "/UpdateProduct",
  Controllers.ProductControllerAPI.UpdateProduct
);
router.post(
  "/GetProductById",
  Controllers.ProductControllerAPI.GetProductById
);
router.delete(
  "/DeleteProduct",
  Controllers.ProductControllerAPI.DeleteProduct
);


module.exports = router;
