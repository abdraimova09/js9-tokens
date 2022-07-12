import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";

const LoginForm = () => {
  const { login, loginError } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleSave() {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    login(formData, email, navigate);
  }
  return (
    <Container maxWidth="sm">
      <Box display={"flex"} flexDirection={"column"} marginTop={"50px"}>
        <Typography variant="h5">Login</Typography>
        {loginError ? <Alert severity="error">{loginError}</Alert> : null}
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
        />
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
        />
        <Button onClick={handleSave} variant="contained">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
