import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    assignedTo: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validate YYYY/MM/DD format
  const isValidDateFormat = (dateString: string) => {
    return /^\d{4}\/\d{2}\/\d{2}$/.test(dateString);
  };

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
      setSuccessMessage("Dates must be in YYYY/MM/DD format.");
      setLoading(false);
      return;
    }

    try {
      const formattedData = {
        ...formData,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      const { data } = await axios.post(
        "http://localhost:6007/task",
        formattedData
      );
      console.log(data);
      setSuccessMessage("Project added successfully!");
      setFormData({
        title: "",
        assignedTo: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Failed to add project:", error);
      setSuccessMessage("Failed to add project. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "500px",
        mx: "auto",
        mt: 4,
        p: 3,
        bgcolor: "white",
        borderRadius: "8px",
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
        Project Manager
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          label="Title"
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
          rows={3}
          required
          fullWidth
        />
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Start Date (YYYY/MM/DD)
          </Typography>
          <TextField
            type="text"
            name="startDate"
            placeholder="e.g., 2025/07/24"
            value={formData.startDate}
            onChange={handleChange}
            required
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            End Date (YYYY/MM/DD)
          </Typography>
          <TextField
            type="text"
            name="endDate"
            placeholder="e.g., 2025/08/24"
            value={formData.endDate}
            onChange={handleChange}
            required
            fullWidth
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Project"}
        </Button>
      </form>

      {successMessage && (
        <Typography
          variant="subtitle2"
          align="center"
          color={successMessage.includes("successfully") ? "green" : "red"}
          mt={2}
        >
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default AddProject;
