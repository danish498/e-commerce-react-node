const db = require("../models");

const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiErrors");

const color = require("colors");
const { Op, fn, col } = require("sequelize");
const { logger } = require("../logger/winston.logger");
const { getRole } = require("../helper/helper");

const Product = db.Product;
const Category = db.Category;

/**
 * This routes to get the ALL PRODUCTS
 * @url /products
 * @protected yes
 * @method GET
 */

const getAllProduct = asyncHandler(async (req, res, next) => {
  const { tag, author, favorited } = req.query;

  const user = req.user;

  // console.log("check the user response over here here and here and here", user);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const searchQuery = req.body.search || "";
  const sku = req.body.sku || "";
  const title = req.body.title || "";
  const description = req.body.description || "";

  try {
    let whereCondition = {};
    if (searchQuery) {
      whereCondition = {
        [Op.or]: [
          { title: { [Op.like]: `%${searchQuery}%` } },
          { description: { [Op.like]: `%${searchQuery}%` } },
          { sku: { [Op.like]: `%${searchQuery}%` } },
        ],
      };
    }

    if (sku || title || description) {
      whereCondition = {
        ...whereCondition,
        [Op.or]: [
          ...(sku ? [{ sku: { [Op.like]: `%${sku}%` } }] : []),
          ...(title ? [{ title: { [Op.like]: `%${title}%` } }] : []),
          ...(description
            ? [{ description: { [Op.like]: `%${description}%` } }]
            : []),
        ],
      };
    }
    const offset = (page - 1) * limit;

    let products = { rows: [], count: 0 };

    products = await Product.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
        {
          model: db.Seller,
          as: "seller",
          attributes: ["store_name", "email"],
        },
      ],
    });

    const totalPages = Math.ceil(products.count / limit);

    for (let product of products.rows) {
      const favorited = await product.hasWishlist(user ? user : null);
      const productReview = await db.Review.findOne({
        where: { product_id: product.product_id },
        attributes: [
          [fn("AVG", col("rating")), "average_rating"],
          [fn("COUNT", col("review_id")), "total_reviews"],
        ],
        raw: true,
      });

      product.dataValues.favorited = user ? favorited : false;
      product.dataValues.total_review = productReview
        ? productReview.total_reviews
        : 0;

      product.dataValues.average_rating = productReview
        ? Number(productReview.average_rating).toFixed(1)
        : 0;
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          products: products.rows,
          pagination: {
            currentPage: page,
            totalPages,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
            totalItem: products.count,
          },
        },
        "Products fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(404, error);
  }
});

/**
 * This routes to get the SINGLE PRODUCT
 * @url /product/:id
 * @protected yes
 * @method GET
 *
 */

const getSingleProduct = asyncHandler(async (req, res) => {
  const product_id = req.params.id;
  const user = req.user;
  const product = await Product.findOne({
    where: {
      product_id: product_id,
    },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["name"],
      },
      {
        model: db.Seller,
        as: "seller",
        attributes: ["store_name", "email"],
      },
    ],
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // console.log(Object.getOwnPropertyNames(product.__proto__));

  const favorited = await product.hasWishlist(user ? user : null);
  const productReview = await db.Review.findOne({
    where: { product_id: product.product_id },
    attributes: [
      [fn("AVG", col("rating")), "average_rating"],
      [fn("COUNT", col("review_id")), "total_reviews"],
    ],
    raw: true,
  });

  product.dataValues.favorited = user ? favorited : false;
  product.dataValues.total_review = productReview
    ? productReview.total_reviews
    : false;

  product.dataValues.average_rating = productReview
    ? Number(productReview.average_rating).toFixed(1)
    : 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products: product,
      },
      "Products fetched successfully"
    )
  );
});

/**
 * This routes to Create a SINGLE PRODUCT
 * @url /product
 * @protected yes
 * @method POST
 */

const createProduct = asyncHandler(async (req, res, next) => {
  const seller = req.user;

  const {
    title,
    description,
    ingredients,
    sku,
    category_id,
    price,
    final_price,
    discounted_percentage,
  } = req.body;

  const role = await getRole(seller.role_id);

  if (role.name !== "Seller") {
    throw new ApiError(
      401,
      "You are not authorized to perform this action",
      "You are not authorized to perform this action"
    );
  }

  const seller_id = seller.seller_id;

  const existingProduct = await Product.findOne({
    where: {
      sku: sku,
    },
  });

  if (existingProduct) {
    throw new ApiError(409, "Product already exists", []);
  }

  const productData = {
    title: title,
    description: description,
    ingredients: JSON.stringify(ingredients),
    sku: sku,
    category_id: category_id,
    price: price,
    final_price: final_price,
    discounted_percentage: discounted_percentage,
    seller_id: seller_id,
    inventory_id: 2,
  };

  // setSeller

  const product = await Product.create(productData);

  const categoryName = await product.getCategory();

  product.dataValues.seller = seller;
  product.dataValues.category = categoryName;

  // console.log(Object.getOwnPropertyNames(product.__proto__));

  return res
    .status(200)
    .json(
      new ApiResponse(200, { product: product }, "Product created successfully")
    );
});

module.exports = {
  getAllProduct,
  getSingleProduct,
  createProduct,
};
