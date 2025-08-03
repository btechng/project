import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/userApi";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const { data } = await getAllUsers();
    setUsers(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box px={2} py={5} bgcolor="#f4f6f8" minHeight="100vh">
      <Typography variant="h4" fontWeight={700} align="center" mb={4}>
        All Users
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        maxWidth="800px"
        mx="auto"
      >
        {users.map((user) => (
          <Paper
            key={user._id}
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fff",
              transition: "0.3s",
              "&:hover": { boxShadow: 8 },
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  component={Link}
                  to={`/user/${user._id}`}
                  variant="outlined"
                  color="info"
                  size="small"
                >
                  View
                </Button>
                <Button
                  component={Link}
                  to={`/user/edit/${user._id}`}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(user._id)}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
