import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import RegisterSuccess from "./components/RegisterSuccess/RegisterSuccess";

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
    </Routes>
  );
};

export default Routing;
