import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct/AddProduct";
import Details from "./components/Details/Details";
import EditProduct from "./components/EditProduct/EditProduct";
import Favorites from "./components/Favorites/Favorites";
import Loader from "./components/Loader/Loader";
import LoginForm from "./components/LoginForm/LoginForm";
import ProductsList from "./components/ProductsList/ProductsList";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import RegisterSuccess from "./components/RegisterSuccess/RegisterSuccess";
import { authContext } from "./contexts/authContext";

const Routing = () => {
  const { loading, currentUser } = useContext(authContext);
  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          currentUser ? <Navigate to="/products" replace /> : <LoginForm />
        }
      />
      <Route
        path="/register"
        element={
          currentUser ? <Navigate to="/products" replace /> : <RegisterForm />
        }
      />
      <Route
        path="/register-success"
        element={
          currentUser ? (
            <Navigate to="/products" replace />
          ) : (
            <RegisterSuccess />
          )
        }
      />
      <Route
        path="/products"
        element={
          currentUser ? <ProductsList /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/products/:id"
        element={currentUser ? <Details /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/edit/:id"
        element={
          currentUser ? <EditProduct /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/add"
        element={
          currentUser ? <AddProduct /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/favorites"
        element={currentUser ? <Favorites /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default Routing;
