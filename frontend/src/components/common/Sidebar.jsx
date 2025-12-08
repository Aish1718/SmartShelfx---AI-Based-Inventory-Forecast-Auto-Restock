// // import React, { useContext } from 'react';
// // import { NavLink } from 'react-router-dom';
// // import { AuthContext } from '../../context/AuthContext';
// // import {
// //   LayoutDashboard,
// //   Package,
// //   ArrowUpDown,
// //   TrendingUp,
// //   ShoppingCart,
// //   Bell,
// //   BarChart3,
// // } from 'lucide-react';

// // const Sidebar = () => {
// //   const { user } = useContext(AuthContext);

// //   const menuItems = [
// //     { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['ADMIN', 'MANAGER', 'VENDOR'] },
// //     { path: '/products', icon: Package, label: 'Products', roles: ['ADMIN', 'MANAGER'] },
// //     { path: '/transactions', icon: ArrowUpDown, label: 'Transactions', roles: ['ADMIN', 'MANAGER'] },
// //     { path: '/forecast', icon: TrendingUp, label: 'Forecast', roles: ['ADMIN', 'MANAGER'] },
// //     { path: '/purchase-orders', icon: ShoppingCart, label: 'Purchase Orders', roles: ['ADMIN', 'MANAGER', 'VENDOR'] },
// //     { path: '/alerts', icon: Bell, label: 'Alerts', roles: ['ADMIN', 'MANAGER'] },
// //     { path: '/analytics', icon: BarChart3, label: 'Analytics', roles: ['ADMIN', 'MANAGER'] },
// //   ];

// //   const filteredMenuItems = menuItems.filter((item) =>
// //     item.roles.includes(user?.role)
// //   );

// //   return (
// //     <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 pt-20">
// //       <nav className="px-4 py-6">
// //         <ul className="space-y-2">
// //           {filteredMenuItems.map((item) => (
// //             <li key={item.path}>
// //               <NavLink
// //                 to={item.path}
// //                 className={({ isActive }) =>
// //                   `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
// //                     isActive
// //                       ? 'bg-indigo-600 text-white'
// //                       : 'text-gray-300 hover:bg-gray-800'
// //                   }`
// //                 }
// //               >
// //                 <item.icon className="w-5 h-5" />
// //                 <span>{item.label}</span>
// //               </NavLink>
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Sidebar;



// // path: frontend/src/components/common/Sidebar.jsx

// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { Users } from 'lucide-react';


// import {
//   LayoutDashboard,
//   Package,
//   ArrowUpDown,
//   TrendingUp,
//   ShoppingCart,
//   Bell,
//   BarChart3,
// } from 'lucide-react';

// const Sidebar = () => {
//   const { user } = useContext(AuthContext);

//   if (!user) return null;

//   // const role = user.role;
//   const rawRole = user.role;
//   const role = rawRole?.startsWith('ROLE_') ? rawRole.slice(5) : rawRole;

//   // ============================
//   // ROLE-BASED SIDEBAR ITEMS
//   // ============================

//   let menuItems = [];

//   // ----------------------------
//   // ADMIN + MANAGER MENU
//   // ----------------------------
//   if (role === "ADMIN" || role === "MANAGER") {
//     menuItems = [
//       { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//       { path: '/products', icon: Package, label: 'Products' },
//       { path: '/transactions', icon: ArrowUpDown, label: 'Transactions' },
//       { path: '/forecast', icon: TrendingUp, label: 'Forecast' },
//       { path: '/purchase-orders', icon: ShoppingCart, label: 'Purchase Orders' },
//       { path: '/alerts', icon: Bell, label: 'Alerts' },
//       // { path: '/analytics', icon: BarChart3, label: 'Analytics' },
//     ];
//   }

//     // Add extra admin-only item
//     if (role === "ADMIN") {
//       menuItems.push({
//         path: '/register',
//         icon: Users,
//         label: 'User Management'
//       });
//     }

//     if (role === "ADMIN") {
//   menuItems.push({
//     path: '/admin/users',
//     icon: Users,
//     label: 'View Users'
//   });
// }



//   // ----------------------------
//   // VENDOR MENU
//   // ----------------------------
//   // if (role === "VENDOR") {
//   //   menuItems = [
//   //     {
//   //       path: '/vendor/dashboard',
//   //       icon: LayoutDashboard,
//   //       label: 'Dashboard'
//   //     },
//   //     {
//   //       path: '/vendor/orders',
//   //       icon: ShoppingCart,
//   //       label: 'My Orders'
//   //     }
//   //   ];
//   // }

//   if (role === "VENDOR") {
//   menuItems = [
//     {
//       path: '/vendor/orders',
//       icon: ShoppingCart,
//       label: 'My Orders'
//     }
//   ];
// }


//   return (
//     <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 pt-20">
//       <nav className="px-4 py-6">
//         <ul className="space-y-2">
//           {menuItems.map((item) => (
//             <li key={item.path}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
//                     isActive
//                       ? 'bg-indigo-600 text-white'
//                       : 'text-gray-300 hover:bg-gray-800'
//                   }`
//                 }
//               >
//                 <item.icon className="w-5 h-5" />
//                 <span>{item.label}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;




// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { Users } from 'lucide-react';

// import {
//   LayoutDashboard,
//   Package,
//   ArrowUpDown,
//   TrendingUp,
//   ShoppingCart,
//   Bell,
// } from 'lucide-react';

// const Sidebar = () => {
//   const { user } = useContext(AuthContext);
//   if (!user) return null;

//   const rawRole = user.role;
//   const role = rawRole?.startsWith("ROLE_") ? rawRole.slice(5) : rawRole;

//   let menuItems = [];

//   if (role === "ADMIN" || role === "MANAGER") {
//     menuItems = [
//       { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//       { path: "/products", icon: Package, label: "Products" },
//       { path: "/transactions", icon: ArrowUpDown, label: "Transactions" },
//       { path: "/forecast", icon: TrendingUp, label: "Forecast" },
//       { path: "/purchase-orders", icon: ShoppingCart, label: "Purchase Orders" },
//       { path: "/alerts", icon: Bell, label: "Alerts" }
//     ];
//   }

//   if (role === "ADMIN") {
//     menuItems.push(
//       { path: "/register", icon: Users, label: "User Management" },
//       { path: "/admin/users", icon: Users, label: "View Users" }
//     );
//   }

//   if (role === "VENDOR") {
//     menuItems = [
//       { path: "/vendor/orders", icon: ShoppingCart, label: "My Orders" }
//     ];
//   }

//   return (
//     <div className="w-64 h-screen fixed left-0 top-0 pt-20
//                     bg-[#0d1322]/95 backdrop-blur-xl
//                     border-r border-white/10 shadow-xl shadow-black/40">

//       <nav className="px-4 py-6">
//         <ul className="space-y-3">
//           {menuItems.map((item) => (
//             <li key={item.path}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `
//                   flex items-center space-x-3 px-4 py-3 rounded-xl transition-all
//                   ${isActive
//                     ? "bg-indigo-600/30 text-white border border-indigo-500/40 shadow-md shadow-indigo-500/20"
//                     : "text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-indigo-500/10"
//                   }
//                   `
//                 }
//               >
//                 <item.icon className="w-5 h-5 text-indigo-300" />
//                 <span className="font-medium">{item.label}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;




import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Users } from 'lucide-react';

import {
  LayoutDashboard,
  Package,
  ArrowUpDown,
  TrendingUp,
  ShoppingCart,
  Bell,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  const rawRole = user.role;
  const role = rawRole?.startsWith("ROLE_") ? rawRole.slice(5) : rawRole;

  let menuItems = [];

  if (role === "ADMIN" || role === "MANAGER") {
    menuItems = [
      { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/products", icon: Package, label: "Products" },
      { path: "/transactions", icon: ArrowUpDown, label: "Transactions" },
      { path: "/forecast", icon: TrendingUp, label: "Forecast" },
      { path: "/purchase-orders", icon: ShoppingCart, label: "Purchase Orders" },
      { path: "/alerts", icon: Bell, label: "Alerts" },
    ];
  }

  if (role === "ADMIN") {
    menuItems.push(
      { path: "/register", icon: Users, label: "User Management" },
      { path: "/admin/users", icon: Users, label: "View Users" }
    );
  }

  if (role === "VENDOR") {
    menuItems = [
      { path: "/vendor/orders", icon: ShoppingCart, label: "My Orders" }
    ];
  }

  return (
    <div
      className="
        w-64 h-screen fixed left-0 top-0 pt-20
        bg-[#D2C1B6]
        border-r border-[#b7a396]
        shadow-lg shadow-black/10
      "
    >
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center space-x-3 px-4 py-3 rounded-lg font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-black/20 text-[#2B2B2B] shadow-md"
                      : "text-[#2B2B2B] hover:bg-black/10"
                  }
                  `
                }
              >
                <item.icon className="w-5 h-5 text-[#4B3F72]" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
