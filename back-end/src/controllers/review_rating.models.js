const { asyncHandler } = require("../utils/asyncHandler");

const createReview = asyncHandler(async (req, res, next) => {});

const updateReview = asyncHandler(async (req, res, next) => {});

const deleteReview = asyncHandler(async (req, res, next) => {});

const getReviews = asyncHandler(async (req, res, next) => {});
const productReviews = asyncHandler(async (req, res, next) => {});

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
  productReviews,
};
