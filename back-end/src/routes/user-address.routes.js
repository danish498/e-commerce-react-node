const express = require("express");
const {
  createUserAddress,
  getUserAddress,
  changeDefaultAddress,
} = require("../controllers/user-address.controllers");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/addresses").post(verifyJWT, createUserAddress);
router.route("/addresses").get(verifyJWT, getUserAddress);
router.route("/default-address/:id").put(verifyJWT, changeDefaultAddress);

module.exports = router;
