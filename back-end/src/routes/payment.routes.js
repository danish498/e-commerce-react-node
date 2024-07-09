const express = require("express");

const { initiatePayment } = require("../controllers/payment.controllers.js");
const {
  verifyJWT,
  getLoggedInUserOrIgnore,
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.route("/create-order").post(verifyJWT, initiatePayment);

module.exports = router;
