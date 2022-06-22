import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container maxWidth="sm">
      <Box display={"flex"} flexDirection={"column"} marginTop={"50px"}>
        <Typography variant="h5">Login</Typography>
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
        <Button variant="contained">Login</Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
