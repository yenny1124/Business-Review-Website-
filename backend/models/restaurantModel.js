// restaurantModel.js
const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a correct restaurant name"],
  },
  location: {
    type: String,
    required: true,
  },
  price_range: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
