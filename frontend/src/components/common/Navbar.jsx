// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { Bell, User, LogOut, Package } from 'lucide-react';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="bg-indigo-600 p-2 rounded-lg">
//             <Package className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-xl font-bold text-gray-900">SmartShelfX</span>
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//             <Bell className="w-5 h-5" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           <div className="flex items-center space-x-3">
//             <div className="text-right">
//               <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//               <p className="text-xs text-gray-500">{user?.role}</p>
//             </div>
//             <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//               <User className="w-5 h-5 text-indigo-600" />
//             </div>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//           >
//             <LogOut className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { User, LogOut, Package } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#0d1322]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg border border-blue-900 bg-[#1F2A38] shadow-lg shadow-blue-900/30">
            <Package className="w-6 h-6 text-blue-300" />
          </div>
          <span className="text-xl font-extrabold text-white tracking-wide">
            SmartShelfX
          </span>
        </div>

        {/* User Profile + Logout */}
        <div className="flex items-center space-x-4">

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>

            <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-400/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-md shadow-indigo-500/20">
              <User className="w-5 h-5 text-indigo-300" />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg transition text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
