const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const jwtUtil = require("../utils/jwt.utils");

const registerDevice = asyncHandler(async (req, res, next) => {
  const { latitude, longitude, device_type, device_id, ip_address } = req.body;

  const deviceData = {
    latitude: latitude,
    longitude: longitude,
    device_type: device_type,
    device_id: device_id,
    ip_address: ip_address,
  };

  const token = await jwtUtil.createToken(deviceData);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { token: token }, "Device registered successfully")
    );
});

const createSession = asyncHandler(async (req, res, next) => {
      if (!req.session.initialized) {
        req.session.initialized = true;
        req.session.save((err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Failed to initialize session" });
          }
          return res
            .status(200)
            .json({ message: "Session initialized", sessionId: req.session.id });
        });
      } else {
        return res.status(200).json({
          message: "Session already initialized",
          sessionId: req.session.id,
        });
      }
});

module.exports = {
  registerDevice,
  createSession,
};

// app.get("/api/v1/initialize-session", (req, res) => {
//     if (!req.session.initialized) {
//       req.session.initialized = true;
//       req.session.save((err) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ message: "Failed to initialize session" });
//         }
//         return res
//           .status(200)
//           .json({ message: "Session initialized", sessionId: req.session.id });
//       });
//     } else {
//       return res.status(200).json({
//         message: "Session already initialized",
//         sessionId: req.session.id,
//       });
//     }
//   });

//   app.delete("/api/v1/session-delete", (req, res, next) => {
//     if (req.session) {
//       req.session.destroy((err) => {
//         if (err) {
//           return res.status(500).json({ message: "Failed to destroy session" });
//         }
//         res.clearCookie("session-id"); // Optionally clear the session cookie
//         return res.status(200).json({ message: "Logged out successfully" });
//       });
//     } else {
//       return res.status(401).json({ message: "No active session to destroy" });
//     }
//   });
