import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../api/userApi";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserById(id!);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box mt={6} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography align="center" mt={4}>
        User not found
      </Typography>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f0f2f5"
      px={2}
    >
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" fontWeight={600} align="center" mb={3}>
          User Profile
        </Typography>

        <Stack spacing={2}>
          <Typography>
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
        </Stack>

        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/users")}
            sx={{ px: 4, py: 1.2, textTransform: "none", fontWeight: 600 }}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
