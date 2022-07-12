import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { productsContext } from "../../contexts/productsContext";
import Loader from "../Loader/Loader";

const Header = () => {
  const navigate = useNavigate();
  const { checkAuth, currentUser, logout, loading } = useContext(authContext);
  const { loading: productsLoading } = useContext(productsContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);
  // console.log(currentUser);
  if (loading || productsLoading) {
    return <Loader />;
  }
  return (
    <Container>
      {currentUser ? (
        <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
          <Box>
            <Typography variant="h6">{currentUser}</Typography>
            <Button
              style={{ marginBottom: "10px" }}
              onClick={logout}
              variant="outlined">
              Logout
            </Button>
          </Box>
          <Button
            style={{ marginBottom: "5px" }}
            onClick={() => navigate("/favorites")}
            variant="contained">
            Favorites
          </Button>
          <Button
            style={{ marginBottom: "5px" }}
            onClick={() => navigate("/products")}
            variant="contained">
            Products
          </Button>
          <Button
            style={{ marginBottom: "5px" }}
            onClick={() => navigate("/add")}
            variant="contained">
            Add product
          </Button>
        </Box>
      ) : (
        <Box>
          <Button onClick={() => navigate("/login")} variant="outlined">
            Login
          </Button>
          <Button onClick={() => navigate("/register")} variant="outlined">
            Register
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Header;
