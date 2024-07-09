const express = require("express");
const {
  registerDevice,
  createSession,
} = require("../controllers/register_device.controllers");

const router = express.Router();

router.route("/device_register").post(registerDevice);
router.route("/initialize-session").get(createSession);

module.exports = router;
