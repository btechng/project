import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/userApi";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupUser(formData);
      alert("Signup successful");
      navigate("/login");
    } catch {
      alert("Signup failed");
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
      <Paper elevation={4} sx={{ p: 4, maxWidth: 450, width: "100%" }}>
        <Typography variant="h5" mb={3} fontWeight={600}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              onChange={handleChange}
              fullWidth
              required
            />
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
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
            <Button onClick={() => navigate("/login")} fullWidth>
              Already have an account? Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
