import React, { useContext, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await RestaurantFinder.get(`/${id}`);
          console.log('API response:', response.data);
          setSelectedRestaurant(response.data);
    
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        // Handle the error or set an appropriate state to indicate the error
      }
    };

    fetchData();
  }, [id, setSelectedRestaurant]);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.name}
          </h1>
          {/* Other details can be displayed here */}
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;