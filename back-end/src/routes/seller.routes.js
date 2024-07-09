const express = require("express");

const { validate } = require("../validators/validators.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  registerSeller,
  loginSeller,
} = require("../controllers/seller.controllers.js");

const router = express.Router();

router.route("/seller/register").post(registerSeller);

router.route("/seller/login").post(loginSeller);

module.exports = router;
