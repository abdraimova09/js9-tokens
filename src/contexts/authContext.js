import React, { useState } from "react";
import axios from "axios";

export const authContext = React.createContext();

const API = "https://backend-for-fs-makers.herokuapp.com/api/v1";

const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState(false);

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
  return (
    <authContext.Provider value={{ error, register }}>
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
