const express = require("express");

const { validate } = require("../validators/validators.js");

const {
  verifyJWT,
  getLoggedInUserOrIgnore,
} = require("../middlewares/auth.middleware.js");
const {
  addProductToCart,
  applyCouponToCart,
  clearProductFromCart,
  getCart,
  removeCartProductQuantity,
  updateCartProductQuantity,
} = require("../controllers/add_to_cart.controllers.js");

const router = express.Router();

router.route("/cart").post(getLoggedInUserOrIgnore, addProductToCart);
router.route("/cart").get(getLoggedInUserOrIgnore, getCart);
router
  .route("/cart/:id")
  .put(getLoggedInUserOrIgnore, updateCartProductQuantity);
router
  .route("/cart/:id")
  .delete(getLoggedInUserOrIgnore, removeCartProductQuantity);
router.route("/cart").delete(getLoggedInUserOrIgnore, clearProductFromCart);
router.route("/cart/coupon").put(getLoggedInUserOrIgnore, applyCouponToCart);

module.exports = router;
