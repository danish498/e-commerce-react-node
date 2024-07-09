const db = require("../models");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiErrors");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.utils");
const color = require("colors");
const { Op } = require("sequelize");
const { logger } = require("../logger/winston.logger");

const Seller = db.Seller;

//@description     Create user object
//@route           POST /register
//@access         Not Protected

const registerSeller = asyncHandler(async (req, res, next) => {
  const { email, password, store_name, phone_number, role_id = 2 } = req.body;


  const existingUser = await Seller.findOne({ where: { email: email } });
  if (existingUser) {
    logger.error("User  already exists");
    throw new ApiError(409, "Email  already exists", {
      email: "Email  already exists",
    });
  }

  const hashedPassword = await bcryptUtil.createHash(password);
  const sellerData = {
    email: email,
    password: hashedPassword,
    role_id: role_id,
  };

  const newSeller = await Seller.create(sellerData);

  if (newSeller.dataValues.password) {
    delete newSeller.dataValues.password;
  }

  newSeller.dataValues.token = await jwtUtil.createToken(newSeller);

  return res
    .status(200)
    .json(new ApiResponse(200, newSeller, "Seller registered successfully."));
});

const loginSeller = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
 

  const seller = await Seller.findOne({ where: { email: email } });

  if (!seller) {
    logger.error("User with email or username does not exists");
    throw new ApiError(409, "Seller does not exists", {
      email: "email does not exists",
    });
  }
  console.log('check the email address', seller);
  const isMatch = await bcryptUtil.compareHash(password, seller.password);
  if (!isMatch) {
    logger.error("Incorrect password");
    throw new ApiError(409, "Incorrect password", {
      password: "Incorrect  password",
    });
  }

  if (seller.dataValues.password) {
    delete seller.dataValues.password;
  }

  seller.dataValues.token = await jwtUtil.createToken(seller);

  return res
    .status(200)
    .json(new ApiResponse(200, { seller }, "Login successful"));
});

module.exports = {
  registerSeller,
  loginSeller,
};
