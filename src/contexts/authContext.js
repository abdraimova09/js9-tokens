import React, { useState } from "react";
import axios from "axios";

export const authContext = React.createContext();

const API = "https://backend-for-fs-makers.herokuapp.com/api/v1";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  async function register(user, navigate) {
    console.log(user);
    let formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("password_confirm", user.passwordConfirm);
    try {
      const res = await axios.post(`${API}/account/register/`, formData);
      navigate("/register-success");
      console.log(res);
    } catch (e) {
      setError(Object.values(e.response.data).flat(2));
    }
  }
  async function login(formData, email, navigate) {
    try {
      let res = await axios.post(`${API}/account/login/`, formData);
      console.log(res);
      localStorage.setItem("token", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      setCurrentUser(email);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  async function checkAuth() {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      let res = await axios.post(
        `${API}/account/token/refresh/`,
        { refresh: token.refresh },
        config
      );
      localStorage.setItem(
        "token",
        JSON.stringify({ refresh: token.refresh, access: res.data.access })
      );
      const email = localStorage.getItem("email");
      setCurrentUser(email);
      console.log(res);
    } catch (e) {
      console.log(e);
      logout();
    } finally {
      setLoading(false);
    }
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setCurrentUser("");
  }
  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        loading,
        register,
        login,
        checkAuth,
        logout,
      }}>
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
