const express = require("express");
const { createReview, updateReview, deleteReview, getReviews, productReviews } = require("../controllers/review_rating.models");

const router = express.Router();

router.route("/reviews").post(createReview);
router.route("/reviews/:id").put(updateReview);                            
router.route("/reviews/:id").delete(deleteReview);                            
router.route("/reviews").get(getReviews);   
router.route('/products/:id/reviews').get(productReviews)


module.exports = router;
