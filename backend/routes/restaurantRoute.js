const express = require('express')
const Restaurant = require('../models/restaurantModel') // import restaurant model
const Review = require('../models/reviewModel')
const router = express.Router();
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getReviews,
  addReview,
  deleteReview,
} = require('../controllers/restaurantController');
  
// get all data from DB
router.get('/', getRestaurants);
  
// get a specific data by id from DB
router.get('/:id', getRestaurant);
  
// create and save data to DB
router.post('/', createRestaurant);
  
// update or edit data in DB (found by a specific id)
router.put('/:id', updateRestaurant);
  
// delete data in DB (found by a specific id)
router.delete('/:id', deleteRestaurant);
  
// get reviews for a specific restaurant
router.get('/:id/reviews', getReviews);
  
// add a review to a specific restaurant
router.post('/:id/reviews', addReview);
  
// delete a review
router.delete('/reviews/:id', deleteReview);
  
module.exports = router;