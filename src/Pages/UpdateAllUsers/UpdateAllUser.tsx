import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const UpdateAllUsers: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [userData, setUserData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `https://fullstack-student-backend.onrender.com/api/auth/${id}`
        );
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        });
      } catch (error) {
        console.error("Error fetching profile", error);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.phoneNumber
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (userData.phoneNumber.length < 8) {
      setError("Phone number is too short.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.put(
        `https://fullstack-student-backend.onrender.com/api/auth/update/${id}`,
        userData
      );
      setSuccess("Profile updated successfully!");
      //NAVIGATION BACK TO SCREEN OF CHOICE
      setTimeout(() => navigate(`/userprofile`), 1300);
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-black rounded-2xl shadow-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Update Profile
        </h2>

        {error && (
          <p className="text-center text-red-500 text-sm mb-4">{error}</p>
        )}
        {success && (
          <p className="text-center text-green-500 text-sm mb-4">{success}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 shadow-sm bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full rounded-lg py-3 font-semibold text-white shadow ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAllUsers;
