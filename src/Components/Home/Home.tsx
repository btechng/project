import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Stack,
  Paper,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Home = () => {
  const [formData, setFormData] = useState({
    title: "",
    assignedTo: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.startDate || !formData.endDate) {
      enqueueSnackbar("Please select both start and end dates.", {
        variant: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "https://firstbackendclass.onrender.com/task",
        formData
      );
      console.log(data);
      enqueueSnackbar("Project added successfully!", { variant: "success" });
      setFormData({
        title: "",
        assignedTo: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Failed to add project:", error);
      enqueueSnackbar("Failed to add project. Check console for details.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      <AppBar position="static" color="primary" sx={{ mb: 3 }}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Welcome!
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ✅ PAGE CONTENT */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f4ff, #fdfdff)",
          py: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "95%",
            maxWidth: "750px",
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: "white",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight={700}
            mb={4}
            color="primary"
          >
            Add New Project or See Existing Projects
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3} mb={3}>
              <TextField
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Assigned To"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                fullWidth
              />
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Stack>
            </Stack>

            <Stack direction="column" spacing={2} mb={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.02)" },
                }}
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                {loading ? "Adding Project..." : "Add Project"}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                size="large"
                onClick={() => navigate("/allprojects")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                See all Projects
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Home;
