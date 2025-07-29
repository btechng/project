import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <Box sx={{ maxWidth: 700, mx: "auto", my: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }} elevation={3}>
        <Typography variant="h5" fontWeight="bold" mb={3} align="center">
          View Project Details
        </Typography>

        <Stack spacing={2}>
          <TextField label="Title" value={project.title} fullWidth disabled />
          <TextField
            label="Assigned To"
            value={project.assignedTo}
            fullWidth
            disabled
          />
          <TextField
            label="Description"
            value={project.description}
            multiline
            rows={3}
            fullWidth
            disabled
          />
          <TextField
            label="Start Date"
            value={project.startDate}
            fullWidth
            disabled
          />
          <TextField
            label="End Date"
            value={project.endDate}
            fullWidth
            disabled
          />

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/edit/${project._id}`)}
              fullWidth
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate(`/delete/${project._id}`)}
              fullWidth
            >
              Delete
            </Button>
          </Stack>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/allprojects")}
            fullWidth
          >
            Back to Projects
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ViewProject;
