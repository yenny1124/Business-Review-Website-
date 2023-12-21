// save all logics for router functions

const Restaurant = require('../models/restaurantModel') // import restaurant model
const Review = require('../models/reviewModel') // import review model
const asyncHandler = require('express-async-handler')

// get all data from DB
const getRestaurants = asyncHandler(async(req, res) => { // access db 
    try{
        const restaurants = await Restaurant.find({}) 
        res.status(200).json(restaurants) // respond back to client 

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// get a single restaurant from DB
const getRestaurant = asyncHandler(async(req, res) => { // access db 
    try{
        const { id } = req.params; // Extract id from request parameters
        const restaurant = await Restaurant.findById(id) 
        // const reviews = await Reviews.findBy(restaurant._id)

        // console.log(reviews)
        res.status(200).json(restaurant)
 
    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// create a Restaurant
const createRestaurant = asyncHandler(async(req, res) => { // access db 
    try{
        const restaurant = await Restaurant.create(req.body)
        res.status(200).json(restaurant)

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// update a restaurant
const updateRestaurant = asyncHandler(async(req, res) => { // access db 
    try{
        const {id} = req.params // the restaurant by id to update
        const restaurant = await Restaurant.findByIdAndUpdate(id,req.body) //send form to client
        //we cannot find the restaurant in DB
        if(!restaurant){
            res.status(404)
            throw new Error(`cannot find any restaurant with ID ${id}`)
        }
        // the restaurant successfully updated 
        const updatedRestaurant = await Restaurant.findById(id)
        res.status(200).json(updatedRestaurant) // return the updated restaurant

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }

})


const deleteRestaurant = asyncHandler(async(req, res) => { // access db 
    try{
        const {id} = req.params // the restaurant to delete
        const restaurant = await Restaurant.findByIdAndDelete(id)
        //we cannot find the restaurant in DB
        if(!restaurant){
            res.status(404)
            throw new Error(`cannot find any restaurant with ID ${id}`)
        }
        // the restaurant successfully deleted
        res.status(200).json(restaurant) // return the deleted restaurant

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

// Get reviews for a specific restaurant
const getReviews = asyncHandler(async (req, res) => {
 try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id).populate('reviews');
    if (!restaurant) {
        res.status(404);
        throw new Error(`Cannot find any restaurant with ID ${id}`);
    }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Add a review to a specific restaurant
const addReview = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, review, rating} = req.body;
      
      // Ensure the restaurant exists
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        res.status(404);
        throw new Error(`Cannot find any restaurant with ID ${id}`);
      }
  
     // Create a new review and associate it with the restaurant
     const newReview = new Review({ name, review, rating, restaurant: id });
     await newReview.save();

     res.status(201).json(newReview);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
})

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const review = await Review.findByIdAndDelete(id);
  
      if (!review) {
        res.status(404);
        throw new Error(`Cannot find any review with ID ${id}`);
      }
  
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})


module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant, 
    getReviews, // Add this line to expose the getReviews function
    addReview, // Add this line to expose the addReview function
    deleteReview, // Add this line to expose the deleteReview function
}