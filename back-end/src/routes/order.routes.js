const express = require("express");

const { createOrder } = require("../controllers/order.controllers.js");
const {
  verifyJWT,
  getLoggedInUserOrIgnore,
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/create-order").post(verifyJWT, createOrder);

module.exports = router;
