import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSnackbar } from "notistack";

const GetSingleTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `https://firstbackendclass.onrender.com/task/${id}`
        );
        setTask(data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch task", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://firstbackendclass.onrender.com/task/${id}`);
      enqueueSnackbar("Task deleted successfully", { variant: "success" });
      navigate("/allprojects");
    } catch (error) {
      enqueueSnackbar("Failed to delete task", { variant: "error" });
    }
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (!task) return <Typography>Task not found.</Typography>;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", py: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>
          {task.title}
        </Typography>
        <Typography>
          <strong>Assigned To:</strong> {task.assignedTo}
        </Typography>
        <Typography>
          <strong>Description:</strong> {task.description}
        </Typography>
        <Typography>
          <strong>Start Date:</strong> {task.startDate}
        </Typography>
        <Typography>
          <strong>End Date:</strong> {task.endDate}
        </Typography>
        <Typography>
          <strong>Status:</strong> {task.status || "Not specified"}
        </Typography>
        <Typography>
          <strong>Completed:</strong> {task.isCompleted ? "Yes" : "No"}
        </Typography>
        <Typography>
          <strong>Project Link:</strong> {task.projectLink || "N/A"}
        </Typography>

        <Stack direction="row" spacing={2} mt={4}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/allprojects")}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/task/edit/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </Button>
        </Stack>
      </Paper>

      {/* Confirm Delete Modal */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task? This action is permanent.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetSingleTask;
