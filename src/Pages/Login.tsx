import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful");
      navigate("/users");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f4f6f8"
      px={2}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" mb={3} fontWeight={600}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              fullWidth
              required
            />
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")} fullWidth>
              Don’t have an account? Sign Up
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
