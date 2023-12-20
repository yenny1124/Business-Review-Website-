import React, {useContext, useState} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurants, restaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await RestaurantFinder.post('/', {
          name,
          location,
          price_range: priceRange,
        });
    
        // Log the current state before updating
        console.log('Before:', restaurants)

        // Update the local state with the new restaurant
        addRestaurants((prevRestaurants) => [...prevRestaurants, response.data]);
    
        // Log the updated state
        console.log('After:', restaurants)

        // Clear the form inputs after successful addition
        setName('');
        setLocation('');
        setPriceRange('Price Range');
    
        console.log(response);
      } catch (err) {
        console.error('Error adding restaurant:', err);
      }
    }

  return (
    <div className='mb-4'>
      <form action="">
        <div className="form-row">
          <div className="col">
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text" 
              className="form-control" 
              placeholder="name"/>
          </div>
          <div className="col">
            <input 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text" 
              className="form-control" 
              placeholder="location" />
          </div>
          <div className="col">
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select my-1 mr-sm-2">
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-auto">
            <button onClick={handleSubmit} type= "submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;