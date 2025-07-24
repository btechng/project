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

  const isValidDateFormat = (dateString: string) =>
    /^\d{4}\/\d{2}\/\d{2}$/.test(dateString);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      !isValidDateFormat(formData.startDate) ||
      !isValidDateFormat(formData.endDate)
    ) {
      enqueueSnackbar("Dates must be in YYYY/MM/DD format.", {
        variant: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:6007/task", formData);
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
          maxWidth: "750px", // Reduced width for focus
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
                label="Start Date (YYYY/MM/DD)"
                name="startDate"
                placeholder="2025/07/24"
                value={formData.startDate}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="End Date (YYYY/MM/DD)"
                name="endDate"
                placeholder="2025/08/24"
                value={formData.endDate}
                onChange={handleChange}
                required
                fullWidth
              />
            </Stack>
          </Stack>

          {/* Buttons now stacked vertically */}
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
  );
};

export default Home;
