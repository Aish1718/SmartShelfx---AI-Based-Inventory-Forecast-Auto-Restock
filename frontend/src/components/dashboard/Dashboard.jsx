// // frontend/src/components/dashboard/Dashboard.jsx

// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { Package, TrendingDown, ShoppingCart, AlertTriangle } from 'lucide-react';
// import api from '../../services/api';

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     lowStockCount: 0,
//     pendingOrders: 0,
//     totalValue: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardStats();
//   }, []);

//   const fetchDashboardStats = async () => {
//     try {
//       const response = await api.get('/dashboard/stats');
//       setStats(response.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statCards = [
//     {
//       title: 'Total Products',
//       value: stats.totalProducts || 0,
//       icon: Package,
//       color: 'bg-blue-500',
//       bgColor: 'bg-blue-50',
//     },
//     {
//       title: 'Low Stock Alerts',
//       value: stats.lowStockCount || 0,
//       icon: AlertTriangle,
//       color: 'bg-red-500',
//       bgColor: 'bg-red-50',
//     },
//     {
//       title: 'Pending Orders',
//       value: stats.pendingOrders || 0,
//       icon: ShoppingCart,
//       color: 'bg-yellow-500',
//       bgColor: 'bg-yellow-50',
//     },
//     {
//       title: 'Inventory Value',
//       value: `$${(stats.totalValue || 0).toLocaleString()}`,
//       icon: TrendingDown,
//       color: 'bg-green-500',
//       bgColor: 'bg-green-50',
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 mt-2">
//           Welcome back, {user?.name}! Here's your inventory overview.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {statCards.map((card, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">{card.title}</p>
//                 <p className="text-2xl font-bold text-gray-900">{card.value}</p>
//               </div>
//               <div className={`${card.bgColor} p-3 rounded-lg`}>
//                 <card.icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
//           <div className="space-y-3">
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="flex items-center justify-between py-3 border-b last:border-b-0">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                     <Package className="w-5 h-5 text-indigo-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Product Updated</p>
//                     <p className="text-xs text-gray-500">2 hours ago</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
//           <div className="space-y-3">
//             <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-3 px-4 rounded-lg text-left font-medium transition">
//               Add New Product
//             </button>
//             <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg text-left font-medium transition">
//               Record Stock In
//             </button>
//             <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-3 px-4 rounded-lg text-left font-medium transition">
//               View Forecast
//             </button>
//             <button className="w-full bg-red-50 hover:bg-red-100 text-red-700 py-3 px-4 rounded-lg text-left font-medium transition">
//               Check Alerts
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect, useContext } from 'react';
// import { Package, TrendingDown, ShoppingCart, AlertTriangle, TrendingUp, ArrowUp, ArrowDown, Clock, DollarSign } from 'lucide-react';

// // Mock AuthContext for demo
// const AuthContext = React.createContext({ user: { name: 'Aishwarya M C' } });

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [stats, setStats] = useState({
//     totalProducts: 6,
//     lowStockCount: 1,
//     pendingOrders: 5,
//     totalValue: 56149.9,
//   });
//   const [lowStockProducts, setLowStockProducts] = useState([]);
//   const [recentTransactions, setRecentTransactions] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//     const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30s
//     return () => clearInterval(interval);
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Simulate API calls - replace with actual API endpoints
//       // const [statsRes, lowStockRes, transactionsRes, topProductsRes] = await Promise.all([
//       //   api.get('/dashboard/stats'),
//       //   api.get('/products/low-stock?limit=5'),
//       //   api.get('/transactions/recent?limit=5'),
//       //   api.get('/products/top-moving?limit=5')
//       // ]);

//       // Mock data for demonstration
//       setStats({
//         totalProducts: 6,
//         lowStockCount: 1,
//         pendingOrders: 5,
//         totalValue: 56149.9,
//       });

//       setLowStockProducts([
//         { id: 1, name: 'Laptop Stand Pro', currentStock: 5, minStock: 10, sku: 'LP-001' },
//         { id: 2, name: 'Wireless Mouse', currentStock: 8, minStock: 15, sku: 'WM-002' },
//         { id: 3, name: 'USB-C Hub', currentStock: 3, minStock: 20, sku: 'UC-003' },
//       ]);

//       setRecentTransactions([
//         { id: 1, type: 'IN', product: 'Mechanical Keyboard', quantity: 50, timestamp: '2 min ago', value: 2500 },
//         { id: 2, type: 'OUT', product: 'Laptop Stand Pro', quantity: 3, timestamp: '15 min ago', value: -450 },
//         { id: 3, type: 'IN', product: 'Wireless Mouse', quantity: 25, timestamp: '1 hour ago', value: 625 },
//         { id: 4, type: 'OUT', product: 'USB-C Hub', quantity: 12, timestamp: '2 hours ago', value: -360 },
//         { id: 5, type: 'IN', product: 'Monitor 27"', quantity: 10, timestamp: '3 hours ago', value: 3000 },
//       ]);

//       setTopProducts([
//         { id: 1, name: 'Mechanical Keyboard', units: 145, trend: 12.5, revenue: 7250 },
//         { id: 2, name: 'Wireless Mouse', units: 98, trend: -5.2, revenue: 2450 },
//         { id: 3, name: 'Monitor 27"', units: 67, trend: 8.3, revenue: 20100 },
//         { id: 4, name: 'USB-C Hub', units: 54, trend: 15.7, revenue: 1620 },
//         { id: 5, name: 'Laptop Stand Pro', units: 43, trend: -2.1, revenue: 6450 },
//       ]);

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       setLoading(false);
//     }
//   };

//   const statCards = [
//     {
//       title: 'Total Products',
//       value: stats.totalProducts || 0,
//       icon: Package,
//       color: 'bg-blue-500',
//       bgColor: 'bg-blue-50',
//       textColor: 'text-blue-600',
//       change: '+2',
//       changeType: 'increase',
//     },
//     {
//       title: 'Low Stock Alerts',
//       value: stats.lowStockCount || 0,
//       icon: AlertTriangle,
//       color: 'bg-red-500',
//       bgColor: 'bg-red-50',
//       textColor: 'text-red-600',
//       change: '0',
//       changeType: 'neutral',
//     },
//     {
//       title: 'Pending Orders',
//       value: stats.pendingOrders || 0,
//       icon: ShoppingCart,
//       color: 'bg-yellow-500',
//       bgColor: 'bg-yellow-50',
//       textColor: 'text-yellow-600',
//       change: '+3',
//       changeType: 'increase',
//     },
//     {
//       title: 'Inventory Value',
//       value: `$${(stats.totalValue || 0).toLocaleString()}`,
//       icon: DollarSign,
//       color: 'bg-green-500',
//       bgColor: 'bg-green-50',
//       textColor: 'text-green-600',
//       change: '+8.2%',
//       changeType: 'increase',
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 mt-2">
//           Welcome back, {user?.name}! Here's your real-time inventory overview.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {statCards.map((card, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={`${card.bgColor} p-3 rounded-lg`}>
//                 <card.icon className={`w-6 h-6 ${card.textColor}`} />
//               </div>
//               {card.changeType !== 'neutral' && (
//                 <span className={`flex items-center text-xs font-semibold ${
//                   card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {card.changeType === 'increase' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
//                   {card.change}
//                 </span>
//               )}
//             </div>
//             <div>
//               <p className="text-sm text-gray-600 mb-1">{card.title}</p>
//               <p className="text-2xl font-bold text-gray-900">{card.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         {/* Low Stock Products */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-1">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
//             <AlertTriangle className="w-5 h-5 text-red-500" />
//           </div>
//           <div className="space-y-3">
//             {lowStockProducts.length > 0 ? (
//               lowStockProducts.map((product) => (
//                 <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-900">{product.name}</p>
//                     <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-bold text-red-600">{product.currentStock}/{product.minStock}</p>
//                     <p className="text-xs text-gray-500">Stock</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500 py-4">All products stocked well!</p>
//             )}
//           </div>
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
//             <Clock className="w-5 h-5 text-gray-400" />
//           </div>
//           <div className="space-y-2">
//             {recentTransactions.map((transaction) => (
//               <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                 <div className="flex items-center space-x-3 flex-1">
//                   <div className={`w-10 h-10 ${transaction.type === 'IN' ? 'bg-green-100' : 'bg-orange-100'} rounded-lg flex items-center justify-center`}>
//                     {transaction.type === 'IN' ? (
//                       <TrendingUp className={`w-5 h-5 text-green-600`} />
//                     ) : (
//                       <TrendingDown className={`w-5 h-5 text-orange-600`} />
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium text-gray-900">{transaction.product}</p>
//                     <p className="text-xs text-gray-500">{transaction.timestamp}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className={`text-sm font-semibold ${transaction.type === 'IN' ? 'text-green-600' : 'text-orange-600'}`}>
//                     {transaction.type === 'IN' ? '+' : '-'}{transaction.quantity}
//                   </p>
//                   <p className="text-xs text-gray-500">${Math.abs(transaction.value)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Top Moving Products */}
//       <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-gray-900">Top Moving Products</h2>
//           <TrendingUp className="w-5 h-5 text-indigo-500" />
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Product</th>
//                 <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Units Sold</th>
//                 <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Trend</th>
//                 <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Revenue</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topProducts.map((product, index) => (
//                 <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                   <td className="py-3 px-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
//                       <span className="text-sm font-medium text-gray-900">{product.name}</span>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     <span className="text-sm font-semibold text-gray-900">{product.units}</span>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
//                       product.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                     }`}>
//                       {product.trend > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
//                       {Math.abs(product.trend)}%
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <span className="text-sm font-semibold text-gray-900">${product.revenue.toLocaleString()}</span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect, useContext } from 'react';
import {
  Package,
  TrendingDown,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Clock,
  DollarSign
} from 'lucide-react';

const AuthContext = React.createContext({ user: { name: 'Aishwarya M C' } });

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalProducts: 6,
    lowStockCount: 1,
    pendingOrders: 5,
    totalValue: 56149.9,
  });

  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    setStats({
      totalProducts: 6,
      lowStockCount: 1,
      pendingOrders: 5,
      totalValue: 56149.9,
    });

    setLowStockProducts([
      { id: 1, name: 'Laptop Stand Pro', currentStock: 5, minStock: 10, sku: 'LP-001' },
      { id: 2, name: 'Wireless Mouse', currentStock: 8, minStock: 15, sku: 'WM-002' },
      { id: 3, name: 'USB-C Hub', currentStock: 3, minStock: 20, sku: 'UC-003' },
    ]);

    setRecentTransactions([
      { id: 1, type: 'IN', product: 'Mechanical Keyboard', quantity: 50, timestamp: '2 min ago', value: 2500 },
      { id: 2, type: 'OUT', product: 'Laptop Stand Pro', quantity: 3, timestamp: '15 min ago', value: -450 },
      { id: 3, type: 'IN', product: 'Wireless Mouse', quantity: 25, timestamp: '1 hour ago', value: 625 },
      { id: 4, type: 'OUT', product: 'USB-C Hub', quantity: 12, timestamp: '2 hours ago', value: -360 },
      { id: 5, type: 'IN', product: 'Monitor 27"', quantity: 10, timestamp: '3 hours ago', value: 3000 },
    ]);

    setTopProducts([
      { id: 1, name: 'Mechanical Keyboard', units: 145, trend: 12.5, revenue: 7250 },
      { id: 2, name: 'Wireless Mouse', units: 98, trend: -5.2, revenue: 2450 },
      { id: 3, name: 'Monitor 27"', units: 67, trend: 8.3, revenue: 20100 },
      { id: 4, name: 'USB-C Hub', units: 54, trend: 15.7, revenue: 1620 },
      { id: 5, name: 'Laptop Stand Pro', units: 43, trend: -2.1, revenue: 6450 },
    ]);

    setLoading(false);
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts || 0,
      icon: Package,
      bgColor: 'bg-blue-900/30',
      iconColor: 'text-blue-400'
    },
    {
      title: 'Low Stock Alerts',
      value: stats.lowStockCount || 0,
      icon: AlertTriangle,
      bgColor: 'bg-red-900/30',
      iconColor: 'text-red-400'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders || 0,
      icon: ShoppingCart,
      bgColor: 'bg-yellow-900/30',
      iconColor: 'text-yellow-400'
    },
    {
      title: 'Inventory Value',
      value: `$${(stats.totalValue || 0).toLocaleString()}`,
      icon: DollarSign,
      bgColor: 'bg-green-900/30',
      iconColor: 'text-green-400'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0F1A]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#0A0F1A] text-[#D2C1B6]">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Welcome back, {user?.name}! Here's your inventory overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="rounded-xl p-6 bg-[#0D1322] border border-[#1A2234] shadow-md hover:shadow-lg transition hover:border-indigo-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">{card.title}</p>
              <p className="text-2xl font-bold mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Low Stock */}
        <div className="bg-[#0D1322] rounded-xl p-6 border border-[#1A2234]">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Low Stock Alert
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </h2>

          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-red-900/20 border border-red-700/30 rounded-lg flex justify-between"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-gray-400">SKU: {p.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-400">{p.currentStock}/{p.minStock}</p>
                  <p className="text-xs text-gray-500">Stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-[#0D1322] rounded-xl p-6 border border-[#1A2234]">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Recent Transactions
            <Clock className="w-5 h-5 text-indigo-400" />
          </h2>

          <div className="space-y-2">
            {recentTransactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between p-3 rounded-lg hover:bg-[#111829] border border-transparent hover:border-[#1A2234] transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center
                    ${t.type === 'IN' ? 'bg-green-900/30 text-green-400' : 'bg-orange-900/30 text-orange-400'}`}
                  >
                    {t.type === 'IN' ? <TrendingUp /> : <TrendingDown />}
                  </div>
                  <div>
                    <p className="font-medium">{t.product}</p>
                    <p className="text-xs text-gray-400">{t.timestamp}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-semibold ${t.type === 'IN' ? 'text-green-400' : 'text-orange-400'}`}>
                    {t.type === 'IN' ? '+' : '-'}{t.quantity}
                  </p>
                  <p className="text-xs text-gray-400">${Math.abs(t.value)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Moving Products */}
      <div className="bg-[#0D1322] rounded-xl p-6 border border-[#1A2234]">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Top Moving Products
          <TrendingUp className="w-5 h-5 text-indigo-400" />
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1A2234]">
                <th className="py-3 px-4 text-gray-400 text-sm">Product</th>
                <th className="py-3 px-4 text-gray-400 text-sm text-center">Units Sold</th>
                <th className="py-3 px-4 text-gray-400 text-sm text-center">Trend</th>
                <th className="py-3 px-4 text-gray-400 text-sm text-right">Revenue</th>
              </tr>
            </thead>

            <tbody>
              {topProducts.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-[#1A2234] hover:bg-[#111829] transition"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">#{i + 1}</span>
                      <span>{p.name}</span>
                    </div>
                  </td>

                  <td className="text-center py-3 px-4 font-semibold">{p.units}</td>

                  <td className="text-center py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1
                      ${p.trend > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}
                    >
                      {p.trend > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(p.trend)}%
                    </span>
                  </td>

                  <td className="text-right py-3 px-4 font-semibold">
                    ${p.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
