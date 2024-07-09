const express = require("express");

const { validate } = require("../validators/validators.js");
const {
  removeFromWishlist,
  addToWIshlist,
  getAllWishlist,
} = require("../controllers/wishlist.controllers.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/wishlist").post(verifyJWT, addToWIshlist);
router.route("/wishlist/:id").delete(verifyJWT, removeFromWishlist);

router.route("/wishlists").get(verifyJWT, getAllWishlist);

module.exports = router;
