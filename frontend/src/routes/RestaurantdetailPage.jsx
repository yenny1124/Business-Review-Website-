import React, { useContext, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview';

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

  console.log('Selected Restaurant:', selectedRestaurant); // Log the selected restaurant

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.name}
          </h1>
          <div className='text-center'>
            <StarRating rating={selectedRestaurant.average_rating}>
              <span className='text-warning ml-1'>
                {selectedRestaurant.count
                  ? `(${selectedRestaurant.count})`
                  : "(0"}
              </span>
            </StarRating>
          </div>
          <div className="mt-3">
            {/* Pass the reviews to the Reviews component */}
            <Reviews reviews={selectedRestaurant.reviews || []} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;