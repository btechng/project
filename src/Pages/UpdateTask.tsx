import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `https://firstbackendclass.onrender.com/task/${id}`
        );
        setFormData(data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch task", { variant: "error" });
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://firstbackendclass.onrender.com/task/${id}`,
        formData
      );
      enqueueSnackbar("Task updated successfully!", { variant: "success" });
      navigate("/allprojects");
    } catch (error) {
      enqueueSnackbar("Failed to update task", { variant: "error" });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Update Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="assignedTo"
            label="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            name="startDate"
            label="Start Date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="endDate"
            label="End Date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="projectLink"
            label="Project Link"
            value={formData.projectLink}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdateTask;
