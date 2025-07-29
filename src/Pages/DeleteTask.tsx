import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";
import { useSnackbar } from "notistack";

const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const deleteTask = async () => {
      try {
        await axios.delete(`https://firstbackendclass.onrender.com/task/${id}`);
        enqueueSnackbar("Task deleted successfully", { variant: "success" });
        navigate("/allprojects");
      } catch (error) {
        enqueueSnackbar("Failed to delete task", { variant: "error" });
      }
    };

    deleteTask();
  }, [id, navigate, enqueueSnackbar]);

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Deleting task...
      </Typography>
    </Box>
  );
};

export default DeleteTask;
