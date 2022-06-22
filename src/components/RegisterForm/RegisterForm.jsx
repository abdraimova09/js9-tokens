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

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, error } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  function handleSave() {
    const user = {
      email,
      password,
      passwordConfirm,
    };
    register(user, navigate);
  }
  return (
    <Container maxWidth="sm">
      <Box display={"flex"} flexDirection={"column"} marginTop={"50px"}>
        <Typography variant="h5">Register</Typography>

        {error ? (
          <Box>
            {error.map((item, index) => (
              <Alert
                key={item + index}
                style={{ marginBottom: "10px" }}
                severity="error">
                {item}
              </Alert>
            ))}
          </Box>
        ) : null}

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
        <TextField
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          label="Password confirmation"
          variant="outlined"
        />
        <Button onClick={handleSave} variant="contained">
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
