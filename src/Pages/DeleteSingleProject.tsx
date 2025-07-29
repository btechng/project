import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteSingleProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(
        `https://firstbackendclass.onrender.com/task/${id}`
      );
      setProject(data);
    } catch (error) {
      console.error("Failed to fetch project", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`https://firstbackendclass.onrender.com/task/${id}`);
      alert("Project deleted successfully.");
      navigate("/allprojects");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete project.");
    } finally {
      setDeleting(false);
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

  if (!project) {
    return <Typography align="center">Project not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Are you sure you want to delete this project?
      </Typography>
      <Typography align="center" fontWeight="bold" mb={2}>
        {project.title}
      </Typography>

      <Stack spacing={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={deleting}
          fullWidth
        >
          {deleting ? "Deleting..." : "Yes, Delete"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/allprojects")}
          fullWidth
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default DeleteSingleProject;
