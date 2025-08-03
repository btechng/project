import axios from "axios";

const BASE_URL = "https://firstbackendclass.onrender.com/api/task/users";

export const signupUser = (userData: {
  name: string;
  email: string;
  password: string;
}) => axios.post(`${BASE_URL}/signup`, userData);

export const loginUser = (credentials: { email: string; password: string }) =>
  axios.post(`${BASE_URL}/login`, credentials);

export const getAllUsers = () => axios.get(`${BASE_URL}`);

export const getUserById = (id: string) => axios.get(`${BASE_URL}/${id}`);

export const updateUser = (id: string, updateData: any) =>
  axios.put(`${BASE_URL}/${id}`, updateData);

export const deleteUser = (id: string) => axios.delete(`${BASE_URL}/${id}`);
