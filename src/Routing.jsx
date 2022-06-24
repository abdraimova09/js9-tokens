import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct/AddProduct";
import LoginForm from "./components/LoginForm/LoginForm";
import ProductsList from "./components/ProductsList/ProductsList";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import RegisterSuccess from "./components/RegisterSuccess/RegisterSuccess";

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/add" element={<AddProduct />} />
    </Routes>
  );
};

export default Routing;
