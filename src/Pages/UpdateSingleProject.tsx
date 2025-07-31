import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  Paper,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateSingleProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    assignedTo: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    isCompleted: false,
    projectLink: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(
        `https://firstbackendclass.onrender.com/task/${id}`
      );
      setFormData({
        title: data.title || "",
        assignedTo: data.assignedTo || "",
        description: data.description || "",
        startDate: data.startDate?.substring(0, 10) || "",
        endDate: data.endDate?.substring(0, 10) || "",
        status: data.status || "",
        isCompleted: data.isCompleted || false,
        projectLink: data.projectLink || "",
      });
    } catch (error) {
      console.error("Failed to fetch project", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await axios.put(
        `https://firstbackendclass.onrender.com/task/${id}`,
        formData
      );
      alert("Project updated successfully!");
      navigate("/allprojects");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update project.");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, px: 2 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" mb={3} align="center">
          Update Project
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Assigned To"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            required
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isCompleted}
                onChange={handleChange}
                name="isCompleted"
              />
            }
            label="Mark as Completed"
          />
          <TextField
            label="Project Link"
            name="projectLink"
            value={formData.projectLink}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Project"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/allprojects")}
          >
            Back to Projects
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default UpdateSingleProject;
