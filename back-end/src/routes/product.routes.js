const express = require("express");
const {
  getAllProduct,
  getSingleProduct,
  createProduct,
} = require("../controllers/product.controllers.js");
const {
  verifyJWT,
  getLoggedInUserOrIgnore,
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/products").get(getLoggedInUserOrIgnore, getAllProduct);
router.route("/product/:id").get(getLoggedInUserOrIgnore, getSingleProduct);
router.route("/product").post(verifyJWT, createProduct);

module.exports = router;
