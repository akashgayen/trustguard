
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your new layout
import MainLayout from './layouts/MainLayout';

// Import your page-level components
import MainPart from './components/MainPart'; // MainPart is now a page
import ProductPage from './components/ProductPage';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <Router>
      <Routes>
        {/*
          The parent route renders our MainLayout (which only contains the Navbar).
          All child routes below will be rendered inside its <Outlet />.
        */}
        <Route path="/" element={<MainLayout />}>

          {/* 
            This is the "index" route.
            When the URL is exactly the parent's path ('/'),
            it will render the MainPart component.
          */}
          <Route index element={<MainPart />} />
          
          {/* 
            When the URL is '/productlist', it will render the ProductsList component.
            The MainPart component will disappear.
          */}
          <Route path="productlist" element={<ProductsList />} /> 

          {/* 
            When the URL is '/products', it will render the ProductPage component.
            The ProductsList component (and MainPart) will disappear.
          */}
          <Route path="products" element={<ProductPage />} /> 

        </Route>
      </Routes>
    </Router>
  );
}

export default App;