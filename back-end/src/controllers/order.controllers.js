const express = require("express");
const Stripe = require("stripe");

var colors = require("colors");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const { orderNumber, getOrderCart } = require("../helper/helper");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { cartData } = require("../data/cartData");
const db = require("../models");
const { ApiError } = require("../utils/ApiErrors");

const createOrder = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const orderNum = orderNumber();
  // const cartItems = cartData.data.cart.cartItems;
  const { payment_method_types, amount, orderItem } = req.body;
  // console.log("check the product info", productInfo);

  const userCart = await getOrderCart(user);

  console.log(colors.green(userCart));

  if (!userCart) {
    return next(new ApiError(400, "Cart is empty or not found"));
  }

  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ["card"], // Default to card if not provided
    amount: userCart.priceDetails.totalPrice * 100, // Stripe expects the amount in cents
    currency: "INR",
  });

  const createOrder = await db.Order.create({
    order_number: orderNum,
    user_id: user.user_id,
    payment_status: "Pending",
    total_price: userCart.priceDetails.totalPrice,
    payment_type: "COD",
  });

  let createOrderItem;

  if (createOrder) {
    await Promise.all(
      userCart.productInfo.map(async (item) => {
        createOrderItem = await db.OrderItem.create({
          order_id: createOrder.order_id,
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
          payment_status: "Pending",
          order_status: "pending",
        });
      })
    );
  }

  if (createOrderItem) {
    await db.Cart.destroy({
      where: {
        user_id: user.user_id,
      },
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        createOrderItem,
        paymentIntent,
      },
      "Payment Response"
    )
  );
});

module.exports = {
  createOrder,
};
