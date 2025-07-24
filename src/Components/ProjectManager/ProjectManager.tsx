import { useEffect, useState } from "react";
import { Box, Typography, Chip, Paper, Stack } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectManager = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("http://localhost:6007/task");
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "in progress":
        return "primary";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", py: 5, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight={700}
        mb={4}
        color="primary"
      >
        All Projects
      </Typography>

      <Stack spacing={3}>
        {projects.map((project) => (
          <Paper
            key={project._id}
            component={Link}
            to={`/userdetails/${project._id}`}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: 6,
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="h6" fontWeight={600} color="primary">
                {project.title}
              </Typography>
              <Chip
                label={project.status || "Unknown"}
                color={getStatusColor(project.status)}
                size="small"
                sx={{ fontWeight: 600, textTransform: "capitalize" }}
              />
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {project.description}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>Start Date:</strong> {formatDate(project.startDate)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>End Date:</strong> {formatDate(project.endDate)}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default ProjectManager;
