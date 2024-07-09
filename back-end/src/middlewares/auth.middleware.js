const { asyncHandler } = require("../utils/asyncHandler.js");
const color = require("colors");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiErrors.js");
const jwtUtil = require("../utils/jwt.utils");

const db = require("../models/index.js");
const { getRole } = require("../helper/helper.js");

const User = db.User;
const Seller = db.Seller;

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // Verify and decode the token
    const decoded = jwtUtil.verifyToken(token);

    // Verify user data consistency using Sequelize (optional)
    console.log(color.bgBlue("user", decoded));
    // const user = await User.findOne(decoded.userId); // Adapt using appropriate query methods

    const role = await getRole(decoded.role_id);

    let user;

    if (role.name === "Seller") {
      user = await Seller.findOne({
        attributes: { exclude: ["password"] },
        where: { email: decoded.email },
      });
    } else if (role.name === "User") {
      user = await User.findOne({
        attributes: { exclude: ["password"] },
        where: { email: decoded.email },
      });
    }

    if (!user) {
      throw new ApiError(401, "Invalid user associated with token");
    }
    // console.log("check the role over here_____", user);
    // Attach user data to request, assuming subsequent usage
    req.user = user;
    // Allow protected route or action to proceed
    next();
  } catch (error) {
    console.error(color.red(error.message));

    // Handle JWT verification errors appropriately
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired. Please log in again.");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token.");
    } else {
      // Handle other errors
      throw new ApiError(500, "Internal server error.");
    }
  }
});

const getLoggedInUserOrIgnore = asyncHandler(async (req, res, next) => {
  
  const { headers } = req;
  if (!headers.authorization) return next();

  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  try {
    // Verify and decode the token
    const decoded = jwtUtil.verifyToken(token);

    // Verify user data consistency using Sequelize (optional)
    console.log(color.bgBlue("user", decoded));
    // const user = await User.findOne(decoded.userId); // Adapt using appropriate query methods

    const role = await getRole(decoded.role_id);

    console.log('check the unusal', role)

    let user;

    if (role.name === "Seller") {
      user = await Seller.findOne({
        attributes: { exclude: ["password"] },
        where: { email: decoded.email },
      });
    } else if (role.name === "User") {
      user = await User.findOne({
        attributes: { exclude: ["password"] },
        where: { email: decoded.email },
      });
    }

    if (!user) {
      throw new ApiError(401, "Invalid user associated with token");
    }
    // console.log("check the role over here_____", user);
    // Attach user data to request, assuming subsequent usage
    req.user = user;
    // Allow protected route or action to proceed
    next();
  } catch (error) {
    console.error(color.red("Error", error.message));

    // Handle JWT verification errors appropriately
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired. Please log in again.");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token.");
    } else {
      // Handle other errors
      throw new ApiError(500, "Internal server error.");
    }
  }
});

module.exports = {
  verifyJWT,
  getLoggedInUserOrIgnore,
};
