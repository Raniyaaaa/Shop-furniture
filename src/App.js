import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';
import MainNavigation from './MainNavigation/MainNavigation';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.authAdmin);

  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/home" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/add-product" element={isLoggedIn ? <AddProduct /> : <Navigate to="/" />} />
        <Route path="/product-list" element={isLoggedIn ? <ProductList /> : <Navigate to="/" />} />
        <Route path="/order-list" element={isLoggedIn ? <OrderList /> : <Navigate to="/" />} />
        <Route path="/" element={!isLoggedIn ? <AdminLogin /> : <Navigate to="/home" />} />
      </Routes>
    </>
  );
};

export default App;
