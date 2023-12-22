// reviewModel.js
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    review: {
      type: String,
      required: [true, "Please enter your review"],
    },
    rating: {
      type: Number,
      required: [true, "Please enter a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not exceed 5"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
