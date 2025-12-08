// import React, { useEffect, useState } from "react";
// import { userService } from "../../services/userService";
// import toast from "react-hot-toast";


// const ViewUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     userService.getAllUsers().then((res) => {
//       setUsers(res.data);
//     });
//   }, []);

//   const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this user?")) return;

//   try {
//     await userService.deleteUser(id);
//     setUsers(users.filter((u) => u.id !== id)); // remove user from table
//     toast.success("User deleted successfully");
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to delete user");
//   }
// };


//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">All Users</h2>

//       <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-6 py-3 text-left">ID</th>
//             <th className="px-6 py-3 text-left">Name</th>
//             <th className="px-6 py-3 text-left">Email</th>
//             <th className="px-6 py-3 text-left">Role</th>
//             <th className="px-6 py-3 text-left">Active</th>
//             <th className="px-6 py-3 text-left">Delete</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id} className="border-b">
//               <td className="px-6 py-3">{u.id}</td>
//               <td className="px-6 py-3">{u.name}</td>
//               <td className="px-6 py-3">{u.email}</td>
//               <td className="px-6 py-3 font-semibold">{u.role}</td>
//               <td className="px-6 py-3">
//                 {u.isActive ? (
//                   <span className="text-green-600 font-bold">Active</span>
//                 ) : (
//                   <span className="text-red-600 font-bold">Inactive</span>
//                 )}
//               </td>
//                 <td className="px-6 py-3">
//                     <button
//                         onClick={() => handleDelete(u.id)}
//                         className="text-red-600 hover:text-red-800 font-semibold"
//                     >
//                         Delete
//                     </button>
//                 </td>


//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewUsers;




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
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-6 text-gray-200 min-h-screen bg-[#0a0f1a]">
      <h2 className="text-3xl font-extrabold mb-6 text-white">
        All Users
      </h2>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111827]/70 backdrop-blur-md shadow-2xl">
        <table className="min-w-full">
          {/* HEADER */}
          <thead className="bg-[#1f2937]/80 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-blue-300 font-semibold">ID</th>
              <th className="px-6 py-4 text-left text-blue-300 font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-blue-300 font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-blue-300 font-semibold">Role</th>
              <th className="px-6 py-4 text-left text-blue-300 font-semibold">Active</th>
              <th className="px-6 py-4 text-left text-blue-300 font-semibold">Delete</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {users.map((u, index) => (
              <tr
                key={u.id}
                className={`border-b border-white/10 ${
                  index % 2 === 0 ? "bg-[#0d1322]/40" : "bg-[#0f172a]/40"
                } hover:bg-[#1e293b]/40 transition`}
              >
                <td className="px-6 py-4">{u.id}</td>
                <td className="px-6 py-4 text-gray-200">{u.name}</td>
                <td className="px-6 py-4 text-gray-300">{u.email}</td>
                <td className="px-6 py-4 font-semibold text-indigo-300">{u.role}</td>

                <td className="px-6 py-4">
                  {u.isActive ? (
                    <span className="text-green-400 font-bold">Active</span>
                  ) : (
                    <span className="text-red-400 font-bold">Inactive</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-400 hover:text-red-300 font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
