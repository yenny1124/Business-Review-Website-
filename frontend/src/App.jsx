import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';  // Adjust the path based on the actual structure

import UpdatePage from './routes/UpdatePage';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
  return (
    <RestaurantsContextProvider>
    <div className='container'>
      <Router>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path='/restaurants/:id/update' element={<UpdatePage />} />
          <Route path='/restaurants/:id' element={<RestaurantdetailPage />} />
        </Routes>
      </Router>
    </div>
    </RestaurantsContextProvider>
  );
}

export default App;