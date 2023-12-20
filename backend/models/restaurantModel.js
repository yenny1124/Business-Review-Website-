const mongoose = require('mongoose') //connect to MongoDB

// create restaurant schema to create restaurant model 
const restaurantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a correct restaurant name"]
        },
        location: {
            type: String,
            required: true,
        },
        price_range: {
            type: Number,
            required: true,

        },
    },
)

// create restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// export the restaurant model out
module.exports = Restaurant;