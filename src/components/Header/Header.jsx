import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box>
        <Button onClick={() => navigate("/login")} variant="outlined">
          Login
        </Button>
        <Button onClick={() => navigate("/register")} variant="outlined">
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Header;
