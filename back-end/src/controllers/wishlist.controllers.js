const { fn, col } = require("sequelize");
const db = require("../models");
const { ApiError } = require("../utils/ApiErrors");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const User = db.User;
const Product = db.Product;

const addToWIshlist = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { product_id } = req.body;

  const product = await Product.findByPk(product_id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await user.addWishlist(product);
  const favorited = await product.hasWishlist(user ? user : null);
  product.dataValues.favorited = user ? favorited : false;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product: product },
        "Product Wishlist successfully"
      )
    );
});

const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const product_id = req.params.id;

  const product = await Product.findByPk(product_id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await user.removeWishlist(product);
  const favorited = await product.hasWishlist(user ? user : null);
  product.dataValues.favorited = user ? favorited : false;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product: product },
        "Product remove from wishlist successfully"
      )
    );
});

const getAllWishlist = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const wishlistProducts = await user.getWishlist({
    include: [
      {
        model: db.Category,
        as: "category",
        attributes: ["category_id", "name"], // Adjust the attributes as needed
      },
    ],
  });

  // console.log("===========Wishlist========", wishlist);

  const products = await Promise.all(
    wishlistProducts.map(async (product) => {
      const productReview = await db.Review.findOne({
        where: { product_id: product.product_id },
        attributes: [
          [fn("AVG", col("rating")), "average_rating"],
          [fn("COUNT", col("review_id")), "total_reviews"],
        ],
        raw: true,
      });

      product.dataValues.total_review = productReview
        ? productReview.total_reviews
        : 0;

      product.dataValues.average_rating = productReview
        ? Number(productReview.average_rating).toFixed(1)
        : 0;

      delete product.dataValues.wishlist_product;
      return product;
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product: products },
        "Product remove from wishlist successfully"
      )
    );
});

module.exports = {
  addToWIshlist,
  removeFromWishlist,
  getAllWishlist,
};
