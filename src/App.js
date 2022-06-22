import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import AuthContextProvider from "./contexts/authContext";
import Routing from "./Routing";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
