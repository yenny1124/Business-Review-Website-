import React, {useContext, useEffect} from 'react'
import RestaurantFinder from "../apis/RestaurantFinder"
import { useNavigate} from "react-router-dom";
import { RestaurantsContext } from '../context/RestaurantsContext'

const RestaurantList = (props) => {
   const {restaurants, setRestaurants} = useContext(RestaurantsContext)
   const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data)

             }catch (err){}
        }
        fetchData();
    }, [setRestaurants])

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        e.preventDefault(); // Add this line to prevent default button behavior
        try {
          const response = await RestaurantFinder.delete(`/${id}`);
          console.log('Delete response:', response.data);
          setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
        } catch (err) {
          console.error('Error deleting restaurant:', err);
        }
      };

  const handleUpdate = (id) =>{
    navigate(`/restaurants/${id}/update`)

  }

  const handleRestaurantSelect = (id)=>{
    navigate(`/restaurants/${id}`)
  }

  return (
    <div>
        <div className='list-group'></div>
        <table className="table table-hover table-dark table-bordered">
            <thead>
                <tr className='table-dark'>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map((restaurant)=>{
                    return(
                        <tr 
                            onClick={()=> handleRestaurantSelect(restaurant._id)} 
                            key={restaurant._id}
                        >
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>reviews</td>
                        <td><button onClick ={() => handleUpdate(restaurant._id)}className="btn btn-warning">Update</button></td>
                        <td><button onClick={(e) => handleDelete(e, restaurant._id)}className='btn btn-danger'>Delete</button></td>
                    </tr>
                    )
                })}

            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList