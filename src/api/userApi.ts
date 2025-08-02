import axios from "axios";
import type { User } from "../types/user"; // ✅ this is correct

const BASE_URL = "https://firstbackendclass.onrender.com/api/users"; // change this to your backend

export const registerUser = (user: User) =>
  axios.post(`${BASE_URL}/signup`, user);
export const loginUser = (user: { email: string; password: string }) =>
  axios.post(`${BASE_URL}/login`, user);

export const getAllUsers = () => axios.get(`${BASE_URL}`);
export const getUserById = (id: string) => axios.get(`${BASE_URL}/${id}`);
export const updateUser = (id: string, user: Partial<User>) =>
  axios.put(`${BASE_URL}/${id}`, user);
export const deleteUser = (id: string) => axios.delete(`${BASE_URL}/${id}`);
