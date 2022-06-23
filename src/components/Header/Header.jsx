import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import Loader from "../Loader/Loader";

const Header = () => {
  const navigate = useNavigate();
  const { checkAuth, currentUser, logout, loading } = useContext(authContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);
  console.log(currentUser);
  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      {currentUser ? (
        <Box>
          <Typography variant="h6">{currentUser}</Typography>
          <Button onClick={logout} variant="outlined">
            Logout
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
