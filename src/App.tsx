import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import  ProductPage  from './components/ProductPage'; // Your ProductPage component
import AmazonNavbar from './components/AmazonNavbar';
import MainPart from './components/MainPart';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <Router>
      <div>
        <AmazonNavbar /> {/* Render the AmazonHomePage component */}
        <MainPart /> {/* Render the MainPart component */}
        <Routes>
          {/* Define a route for your ProductPage */}
          <Route path="/products" element={<ProductPage />} /> 
          <Route path="/productlist" element={<ProductsList />} /> 

          {/* Other routes */}
          {/* <Route path="/" element={<AmazonHomePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;