const { findOrCreateCart, findCart } = require("../helper/helper");
const db = require("../models");
const { ApiError } = require("../utils/ApiErrors");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;

/**
 * Adds a product to the user's cart.
 */
const addProductToCart = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { product_id } = req.body;
  const sessionId = req.session.id;

  if (!product_id) {
    return next(new ApiError(400, "Product ID is required"));
  }

  const product = await Product.findByPk(product_id);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  let cart;
  if (!user) {
    cart = await findOrCreateCart({ session_id: sessionId });
  } else {
    let sessionCart = await Cart.findOne({ where: { session_id: sessionId } });
    if (sessionCart) {
      sessionCart.session_id = null;
      sessionCart.user_id = user.user_id;
      await sessionCart.save();
    }
    cart = await findOrCreateCart({ user_id: user.user_id });
  }

  await addOrUpdateCartItem(cart, product);
  cart = await findOrCreateCart(
    user ? { user_id: user.user_id } : { session_id: sessionId }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { cart }, "Product added to cart successfully"));
});

/**
 * Retrieves the user's cart.
 */
const getCart = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const sessionId = req.session.id;

  const cart = await findCart(
    user ? { user_id: user.user_id } : { session_id: sessionId }
  );

  if (!cart) {
    return next(new ApiError(404, "Cart not found"));
  }

  let totalPrice = 0;
  let totalDiscount = 0;
  let totalItems = 0;

  await Promise.all(
    cart.cartItems.map(async (item) => {
      const product = await item.getCartProducts();
      item.dataValues.Price = item.quantity * product.final_price;

      totalItems += item.quantity;
      totalPrice += item.dataValues.Price;
      totalDiscount += (product.price - product.final_price) * item.quantity;
    })
  );

  const priceDetails = {
    totalItems,
    totalPrice,
    totalDiscount,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cart, priceDetails },
        "Cart retrieved successfully"
      )
    );
});

/**
 * Updates the quantity of a product in the user's cart.
 */
const updateCartProductQuantity = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const product_id = req.params.id;
  const { quantity } = req.body;
  const sessionId = req.session.id;

  if (!product_id) {
    return next(new ApiError(409, "Product ID is required"));
  }
  if (quantity == null || quantity <= 0) {
    return next(new ApiError(409, "Quantity must be a positive number"));
  }

  const cart = await findCart(
    user ? { user_id: user.user_id } : { session_id: sessionId }
  );

  if (!cart) {
    return next(new ApiError(409, "Cart not found"));
  }

  const cartItem = await CartItem.findOne({
    where: {
      cart_id: cart.cart_id,
      product_id: product_id,
    },
  });

  if (!cartItem) {
    return next(new ApiError(409, "This product is not in your cart"));
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  const updatedCart = await findCart({ cart_id: cart.cart_id });

  await Promise.all(
    updatedCart.cartItems.map(async (item) => {
      const product = await item.getCartProducts();
      item.dataValues.Price = product ? item.quantity * product.final_price : 0;
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { cart: updatedCart }, "Cart updated successfully")
    );
});

const removeCartProductQuantity = asyncHandler(async (req, res, next) => {
  // Implementation here...
});

const clearProductFromCart = asyncHandler(async (req, res, next) => {
  // Implementation here...
});

const applyCouponToCart = asyncHandler(async (req, res, next) => {
  // Implementation here...
});

module.exports = {
  addProductToCart,
  clearProductFromCart,
  getCart,
  updateCartProductQuantity,
  removeCartProductQuantity,
  applyCouponToCart,
};
