import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/userApi";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h1>All Users</h1>
      <ul className="space-y-2">
        {users.map((user: any) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <Link to={`/user/${user._id}`}>View</Link>
            <Link to={`/edit-user/${user._id}`}>Edit</Link>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
