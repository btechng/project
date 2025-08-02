import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/userApi";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          All Users
        </h1>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user: any) => (
              <li
                key={user._id}
                className="bg-white p-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Link
                    to={`/user/${user._id}`}
                    className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit-user/${user._id}`}
                    className="px-4 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
