import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ArrowUpDown,
  TrendingUp,
  ShoppingCart,
  Bell,
  BarChart3,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['ADMIN', 'MANAGER', 'VENDOR'] },
    { path: '/products', icon: Package, label: 'Products', roles: ['ADMIN', 'MANAGER'] },
    { path: '/transactions', icon: ArrowUpDown, label: 'Transactions', roles: ['ADMIN', 'MANAGER'] },
    { path: '/forecast', icon: TrendingUp, label: 'Forecast', roles: ['ADMIN', 'MANAGER'] },
    { path: '/purchase-orders', icon: ShoppingCart, label: 'Purchase Orders', roles: ['ADMIN', 'MANAGER', 'VENDOR'] },
    { path: '/alerts', icon: Bell, label: 'Alerts', roles: ['ADMIN', 'MANAGER'] },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', roles: ['ADMIN', 'MANAGER'] },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 pt-20">
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
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