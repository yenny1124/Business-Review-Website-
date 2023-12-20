import React, { useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'
// import StarRating from '../components/StarRating'

const RestaurantdetailPage = () => {
  const{id} = useParams()
  const{selectedRestaurant,setSelectedRestaurant} = useContext(RestaurantsContext)

  useEffect(()=> {
    const fetchData = async () =>{
      try{
        const response = await RestaurantFinder.get(`/${id}`)
        console.log(response.data)
        setSelectedRestaurant(response.data)
      }catch(err){
        console.error('Error fetching data:', err)
      }

    }
    fetchData()
  }, [id, setSelectedRestaurant])

  console.log('Selected Restaurant:', selectedRestaurant)
  return (<div>
            {selectedRestaurant && (
              <>
              <h1 className='text-center display-1'>
              {selectedRestaurant.name})
              </h1>
              {/* <div className="text-center">
                <StarRating rating= {2.3}></StarRating>
              </div> */}
              </>
            )}
          </div>

  )

}

export default RestaurantdetailPage