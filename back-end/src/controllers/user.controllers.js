const db = require("../models");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiErrors");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.utils");
const color = require("colors");
const { Op } = require("sequelize");
const { logger } = require("../logger/winston.logger");

const User = db.User;
const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;

//@description     Create user object
//@route           POST /register
//@access         Not Protected

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, role_id = 3 } = req.body;

  console.log("check the email over here", color.america(email));

  const existingUser = await User.findOne({ where: { email: email } });

  if (existingUser) {
    logger.error("User with email or username already exists");
    throw new ApiError(409, "User with email or username already exists", {
      email: "User with email or username already exists",
    });
  }

  const hashedPassword = await bcryptUtil.createHash(password);
  const userData = {
    email: email,
    password: hashedPassword,
    role_id: role_id,
  };

  const newUser = await User.create(userData);

  if (newUser.dataValues.password) {
    delete newUser.dataValues.password;
  }

  newUser.dataValues.token = await jwtUtil.createToken(newUser);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: newUser }, "Users registered successfully.")
    );
});

const getallUsers = asyncHandler(async (req, res) => {
  const { username, email } = req.query;

  console.log("check the username", username);

  let whereClause = {};

  if (username || email) {
    whereClause = {
      [Op.and]: [{ email: { [Op.like]: `%${email}%` } }],
    };
  }

  const allUsers = await User.findAll({
    attributes: { exclude: ["password"] },
    where: whereClause,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, allUsers, "Users retrieved successfully..."));
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    logger.error("User with email or username does not exists");
    throw new ApiError(409, "User with email or username does not exists", {
      email: "username does not exists",
    });
  }

  const isMatch = await bcryptUtil.compareHash(password, user.password);
  if (!isMatch) {
    logger.error("Incorrect password");
    throw new ApiError(409, "Incorrect password", {
      password: "Incorrect  password",
    });
  }

  if (user.dataValues.password) {
    delete user.dataValues.password;
  }

  user.dataValues.token = await jwtUtil.createToken(user);

  //  if there is any item on the cart on the basis of the session id after user is authenticated their shopping cart must be updated into the user cart

  const sessionId = req.session.id;

  if (sessionId) {
    let sessionCart = await Cart.findOne({
      where: { session_id: sessionId },
      include: [
        {
          model: CartItem,
          as: "cartItems",
          attributes: ["cart_item_id", "product_id", "quantity", "price"],
          include: [
            {
              model: Product,
              as: "cartProducts",
              attributes: [
                "product_id",
                "title",
                "description",
                "price",
                "image",
              ],
            },
          ],
        },
      ],
    });

    console.log("sessionCartsessionCart", sessionCart);

    if (sessionCart) {
      sessionCart.session_id = null;
      sessionCart.user_id = user.user_id;
      await sessionCart.save();
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user: user }, "Login successful"));
});

module.exports = {
  registerUser,
  getallUsers,
  login,
};
