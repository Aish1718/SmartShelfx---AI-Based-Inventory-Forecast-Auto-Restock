import React, { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import toast from "react-hot-toast";


const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await userService.deleteUser(id);
    setUsers(users.filter((u) => u.id !== id)); // remove user from table
    toast.success("User deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete user");
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Active</th>
            <th className="px-6 py-3 text-left">Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="px-6 py-3">{u.id}</td>
              <td className="px-6 py-3">{u.name}</td>
              <td className="px-6 py-3">{u.email}</td>
              <td className="px-6 py-3 font-semibold">{u.role}</td>
              <td className="px-6 py-3">
                {u.isActive ? (
                  <span className="text-green-600 font-bold">Active</span>
                ) : (
                  <span className="text-red-600 font-bold">Inactive</span>
                )}
              </td>
                <td className="px-6 py-3">
                    <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                    >
                        Delete
                    </button>
                </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
