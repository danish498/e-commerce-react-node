const { logger } = require("../logger/winston.logger");
const db = require("../models");
const { ApiError } = require("../utils/ApiErrors");

const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;

const getRole = async (roleId) => {
  console.log({ roleId });
  const role = await db.Role.findOne({
    where: {
      role_id: roleId,
    },
  });

  logger.info("role over here", role);

  return role;
};

function orderNumber() {
  let now = Date.now().toString();

  return [`ORD${now.slice(0, 4)}`, now.slice(4, 10), now.slice(10, 14)].join(
    "-"
  );
}

const findOrCreateCart = async (whereCondition) => {
  let cart = await db.Cart.findOne({
    where: whereCondition,
    include: [
      {
        model: db.CartItem,
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
              "final_price",
              "image",
            ],
          },
        ],
      },
    ],
  });

  if (!cart) {
    cart = await db.Cart.create(whereCondition);
  }

  return cart;
};

const findCart = async (condition) => {
  return await Cart.findOne({
    where: condition,
    include: [
      {
        model: CartItem,
        as: "cartItems",
        attributes: ["cart_item_id", "product_id", "quantity"],
        include: [
          {
            model: Product,
            as: "cartProducts",
            attributes: [
              "product_id",
              "title",
              "description",
              "price",
              "final_price",
              "image",
            ],
          },
        ],
      },
    ],
  });
};

const addOrUpdateCartItem = async (cart, product) => {
  const [cartItem, created] = await db.CartItem.findOrCreate({
    where: {
      cart_id: cart.cart_id,
      product_id: product.product_id,
    },
    defaults: {
      quantity: 1,
      price: product.price,
    },
  });

  if (!created) {
    cartItem.quantity += 1;
    await cartItem.save();
  }
};

const getOrderCart = async (user) => {
  if (!user) {
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
  }

  let cart = await db.Cart.findOne({
    where: { user_id: user.user_id },
    include: [
      {
        model: db.CartItem,
        as: "cartItems",
        attributes: ["cart_item_id", "product_id", "quantity", "price"],
        include: [
          {
            model: db.Product,
            as: "cartProducts",
            attributes: [
              "product_id",
              "title",
              "description",
              "price",
              "image",
              "final_price",
            ],
          },
        ],
      },
    ],
  });

  if (!cart) {
    return false;
  }

  let totalPrice = 0;
  let totalDiscount = 0;
  let totalItems = 0;

  const cartItemsWithTotalPrice = await Promise.all(
    cart.cartItems.map(async (item) => {
      const product = await item.getCartProducts();

      const totalItemPrice = item.quantity * product.final_price;
      const itemDiscount =
        (product.price - product.final_price) * item.quantity;

      totalItems += item.quantity;
      totalPrice += totalItemPrice;
      totalDiscount += itemDiscount;

      return {
        ...item.dataValues,
        totalItemPrice: totalItemPrice,
      };
    })
  );

  const priceDetails = {
    totalItems: totalItems,
    totalPrice: totalPrice,
    totalDiscount: totalDiscount,
  };

  const productInfo = cartItemsWithTotalPrice.map((item) => {
    return {
      productId: item.product_id,
      quantity: item.quantity,
      price: item.totalItemPrice,
    };
  });

  return {
    productInfo,
    priceDetails,
  };
};

module.exports = {
  getRole,
  orderNumber,
  getOrderCart,
  findOrCreateCart,
  addOrUpdateCartItem,
  findCart,
};
