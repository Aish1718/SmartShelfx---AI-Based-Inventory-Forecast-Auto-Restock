// // import React, { useState, useEffect } from 'react';
// // import {
// //   BarChart3,
// //   Download
// // } from 'lucide-react';

// // import {
// //   Chart as ChartJS,
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   PointElement
// // } from 'chart.js';

// // import { Pie, Bar, Line } from 'react-chartjs-2';
// // import { analyticsService } from '../../services/analyticsService';

// // // Register everything (fixes "arc not registered" error)
// // ChartJS.register(
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   PointElement
// // );

// // const AnalyticsDashboard = () => {
// //   const [stats, setStats] = useState(null);
// //   const [inventoryTrends, setInventoryTrends] = useState(null);
// //   const [topProducts, setTopProducts] = useState(null);
// //   const [salesComparison, setSalesComparison] = useState(null);

// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchAnalytics();
// //   }, []);

// //   const fetchAnalytics = async () => {
// //     try {
// //       const statsRes = await analyticsService.getDashboardStats();
// //       const trendsRes = await analyticsService.getInventoryTrends();
// //       const topRes = await analyticsService.getTopProducts();
// //       const salesRes = await analyticsService.getSalesComparison();

// //       setStats(statsRes.data);
// //       setInventoryTrends(trendsRes.data);
// //       setTopProducts(topRes.data);
// //       setSalesComparison(salesRes.data);

// //     } catch (error) {
// //       console.error("Error fetching analytics:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <p className="p-6">Loading analytics...</p>;

// //   // ================================
// //   //   PIE CHART (Top Products)
// //   // ================================
// //   const topProductsData = topProducts ? {
// //     labels: topProducts.labels,
// //     datasets: [
// //       {
// //         data: topProducts.datasets[0].data,
// //         backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
// //       }
// //     ]
// //   } : null;

// //   // ================================
// //   //   BAR CHART (Monthly Stock Movement)
// //   // ================================
// //   // const monthlyData = salesComparison ? {
// //   //   labels: salesComparison.labels,
// //   //   datasets: salesComparison.datasets.map(ds => ({
// //   //     label: ds.label,
// //   //     data: ds.data,
// //   //     backgroundColor: ds.label === "Stock In" ? "#10B981" : "#EF4444"
// //   //   }))
// //   // } : null;



// //       const [monthlyStock, setMonthlyStock] = useState(null);

// //         useEffect(() => {
// //             loadMonthlyStock();
// //         }, []);

// //       const loadMonthlyStock = async () => {
// //           const res = await analyticsService.getMonthlyStock();
// //           setMonthlyStock(res.data);
// //     };


// //   // ================================
// //   //   LINE CHART (Inventory Trend)
// //   // ================================
// //   const trendData = inventoryTrends ? {
// //     labels: inventoryTrends.labels,
// //     datasets: inventoryTrends.datasets.map(ds => ({
// //       label: ds.label || "Inventory Value",
// //       data: ds.data,
// //       borderColor: "#3B82F6",
// //       backgroundColor: "rgba(59,130,246,0.1)",
// //       fill: true
// //     }))
// //   } : null;

// //   return (
// //     <div className="p-6">

// //       {/* PAGE HEADER */}
// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
// //             <BarChart3 className="w-8 h-8 text-indigo-600" />
// //             Analytics & Reports
// //           </h1>
// //           <p className="text-gray-600 mt-1">Comprehensive inventory insights</p>
// //         </div>

// //         <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
// //           <Download className="w-5 h-5" />
// //           Export Report
// //         </button>
// //       </div>

// //       {/* KPI CARDS */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
// //         {/* Total Products */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Total Products</p>
// //           <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
// //         </div>

// //         {/* Total Value */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Total Value</p>
// //           <p className="text-3xl font-bold mt-2">${(stats.totalValue || 0).toLocaleString()}</p>
// //         </div>

// //         {/* Low Stock */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Low Stock Items</p>
// //           <p className="text-3xl font-bold text-red-600 mt-2">{stats.lowStockCount}</p>
// //         </div>

// //         {/* Active Orders */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Active Orders</p>
// //           <p className="text-3xl font-bold text-blue-600 mt-2">{stats.pendingOrders}</p>
// //         </div>
// //       </div>

// //       {/* CHARTS */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //         {/* Pie Chart */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <h2 className="text-lg font-semibold mb-4">Top Products</h2>
// //           {topProductsData ? <Pie data={topProductsData} /> : <p>No data available</p>}
// //         </div>

// //         {/* Bar Chart */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <h2 className="text-lg font-semibold mb-4">Monthly Stock Movement</h2>
// //           {monthlyData ? <Bar
// //                             data={{
// //                               labels: monthlyStock?.labels || [],
// //                               datasets: monthlyStock?.datasets?.map(ds => ({
// //                                 label: ds.label,
// //                                 data: ds.data,
// //                                 backgroundColor: ds.label === "Stock In" ? "#10B981" : "#EF4444"
// //                               })) || []
// //                             }}
// //                           />
// //                       : <p>No data available</p>}
// //                               </div>
// //                             </div>

// //       {/* Line Chart */}
// //       <div className="bg-white rounded-lg shadow-sm p-6">
// //         <h2 className="text-lg font-semibold mb-4">Inventory Trend</h2>
// //         {trendData ? <Line data={trendData} /> : <p>No data available</p>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AnalyticsDashboard;



// // frontend/src/components/analytics/AnalyticsDashboard.jsx

// // import React, { useState, useEffect } from 'react';
// // import { BarChart3, Download } from 'lucide-react';
// // import { Pie, Bar, Line } from 'react-chartjs-2';
// // import {
// //   Chart as ChartJS,
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   PointElement
// // } from 'chart.js';

// // import { analyticsService } from '../../services/analyticsService';

// // ChartJS.register(
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   PointElement
// // );

// // const AnalyticsDashboard = () => {
// //   const [stats, setStats] = useState(null);
// //   const [topProducts, setTopProducts] = useState(null);
// //   const [monthlyStock, setMonthlyStock] = useState(null);
// //   const [trend, setTrend] = useState(null);



// //   useEffect(() => {
// //     loadAllData();

// //       // Dashboard stats
// //     analyticsService.getDashboardStats().then(res => {
// //       setStats(res.data);
// //     });

// //     // Inventory Trend
// //     analyticsService.getInventoryTrend().then(res => {
// //       setTrend(res.data);
// //     });
// //   }, []);

// //   const loadAllData = async () => {
// //     try {
// //       const [statsRes, topRes, monthlyRes, trendRes] = await Promise.all([
// //         analyticsService.getDashboardStats(),
// //         analyticsService.getTopProducts(10),
// //         analyticsService.getMonthlyStock(),
// //         analyticsService.getInventoryTrends(),
// //       ]);

// //       setStats(statsRes.data);
// //       setTopProducts(topRes.data);
// //       setMonthlyStock(monthlyRes.data);
// //       setTrend(trendRes.data);

// //     } catch (err) {
// //       console.error("Analytics Load Error:", err);
// //     }
// //   };

// //   if (!stats || !topProducts || !monthlyStock || !trend)
// //     return <div className="p-6">Loading...</div>;

// //   const topProductData = {
// //     labels: topProducts.labels,
// //     datasets: [{
// //       data: topProducts.datasets[0].data,
// //       backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
// //     }]
// //   };

// //   const monthlyStockData = {
// //     labels: monthlyStock.labels,
// //     datasets: [
// //       {
// //         label: "Stock In",
// //         data: monthlyStock.stockIn,
// //         backgroundColor: '#10B981'
// //       },
// //       {
// //         label: "Stock Out",
// //         data: monthlyStock.stockOut,
// //         backgroundColor: '#EF4444'
// //       }
// //     ]
// //   };



// //   const trendData = {
// //     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
// //     datasets: [{
// //         label: trend.title,
// //         data: trend.datasets[0].data,
// //         borderColor: '#3B82F6',
// //         backgroundColor: 'rgba(59, 130, 246, 0.1)',
// //         tension: 0.4,
// //         pointBackgroundColor: '#3B82F6',
// //         pointRadius: 6,
// //         fill: true,
// //     }]
// //   };



// //   const gradient = (context) => {
// //     const chart = context.chart;
// //     const {ctx, chartArea} = chart;

// //     if (!chartArea) return null;

// //     const gradientBg = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
// //     gradientBg.addColorStop(0, 'rgba(59,130,246,0)');
// //     gradientBg.addColorStop(1, 'rgba(59,130,246,0.4)');

// //     return gradientBg;
// //   };



// //   return (
// //     <div className="p-6">
// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
// //             <BarChart3 className="w-8 h-8 text-indigo-600" />
// //             <span>Analytics & Reports</span>
// //           </h1>
// //           <p className="text-gray-600 mt-1">Comprehensive inventory insights</p>
// //         </div>

// //         <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
// //           <Download className="w-5 h-5" />
// //           <span>Export Report</span>
// //         </button>
// //       </div>

// //       {/* KPI Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Total Products</p>
// //           <p className="text-3xl font-bold">{stats.totalProducts}</p>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Total Value</p>
// //           <p className="text-3xl font-bold">${stats.totalValue?.toLocaleString()}</p>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Low Stock Items</p>
// //           <p className="text-3xl font-bold text-red-600">{stats.lowStockCount}</p>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Active Orders</p>
// //           <p className="text-3xl font-bold text-blue-600">{stats.pendingOrders}</p>
// //         </div>
// //       </div>

// //       {/* Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //         <div className="bg-white p-6 shadow-sm rounded-lg">
// //           <h2 className="text-lg font-semibold mb-4">Top Products</h2>
// //           <Pie data={topProductData} />
// //         </div>

// //         <div className="bg-white p-6 shadow-sm rounded-lg">
// //           <h2 className="text-lg font-semibold mb-4">Monthly Stock Movement</h2>
// //           <Bar data={monthlyStockData} />
// //         </div>
// //       </div>

// //       <div className="bg-white p-6 shadow-sm rounded-lg">
// //         <h2 className="text-lg font-semibold mb-4">Inventory Trend</h2>
// //         <Line data={trendData} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default AnalyticsDashboard;





// // frontend/src/components/analytics/AnalyticsDashboard.jsx

// // import React, { useState, useEffect } from 'react';
// // import { BarChart3, Download, FileText, Table, FileSpreadsheet } from 'lucide-react';
// // import { Pie, Bar, Line } from 'react-chartjs-2';
// // import {
// //   Chart as ChartJS,
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   PointElement
// // } from 'chart.js';
// // import { analyticsService } from '../../services/analyticsService';
// // import { exportToCSV, exportToPDF, exportToExcel } from '../../utils/exportUtils';
// // import toast from 'react-hot-toast';

// // ChartJS.register(
// //   ArcElement,
// //   Tooltip,
// //   Legend,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   PointElement
// // );

// // const AnalyticsDashboard = () => {
// //   const [stats, setStats] = useState(null);
// //   const [topProducts, setTopProducts] = useState(null);
// //   const [monthlyStock, setMonthlyStock] = useState(null);
// //   const [trend, setTrend] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [exporting, setExporting] = useState(false);
// //   const [showExportMenu, setShowExportMenu] = useState(false);

// //   useEffect(() => {
// //     loadAllData();
// //   }, []);

// //   const loadAllData = async () => {
// //     try {
// //       setLoading(true);
// //       const [statsRes, topRes, monthlyRes, trendRes] = await Promise.all([
// //         analyticsService.getDashboardStats(),
// //         analyticsService.getTopProducts(10),
// //         analyticsService.getMonthlyStock(),
// //         analyticsService.getInventoryTrends(),
// //       ]);

// //       setStats(statsRes.data);
// //       setTopProducts(topRes.data);
// //       setMonthlyStock(monthlyRes.data);
// //       setTrend(trendRes.data);
// //     } catch (err) {
// //       console.error("Analytics Load Error:", err);
// //       toast.error('Failed to load analytics data');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleExport = async (format) => {
// //     if (!stats || !topProducts || !monthlyStock || !trend) {
// //       toast.error('No data available to export');
// //       return;
// //     }

// //     setExporting(true);
// //     setShowExportMenu(false);

// //     try {
// //       const exportData = {
// //         stats,
// //         topProducts,
// //         monthlyStock,
// //         trend
// //       };

// //       const timestamp = new Date().toISOString().split('T')[0];
// //       const filename = `smartshelfx-analytics-${timestamp}`;

// //       switch (format) {
// //         case 'csv':
// //           await exportToCSV(exportData, `${filename}.csv`);
// //           toast.success('✅ Report exported to CSV');
// //           break;
// //         case 'pdf':
// //           await exportToPDF(exportData, `${filename}.pdf`);
// //           toast.success('✅ Report exported to PDF');
// //           break;
// //         case 'excel':
// //           await exportToExcel(exportData, `${filename}.xlsx`);
// //           toast.success('✅ Report exported to Excel');
// //           break;
// //         default:
// //           toast.error('Invalid export format');
// //       }
// //     } catch (error) {
// //       console.error('Export failed:', error);
// //       toast.error('Failed to export report');
// //     } finally {
// //       setExporting(false);
// //     }
// //   };

// //   if (loading || !stats || !topProducts || !monthlyStock || !trend) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading analytics...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const topProductData = {
// //     labels: topProducts.labels,
// //     datasets: [{
// //       data: topProducts.datasets[0].data,
// //       backgroundColor: [
// //         '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
// //         '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
// //       ]
// //     }]
// //   };

// //   const monthlyStockData = {
// //     labels: monthlyStock.labels,
// //     datasets: [
// //       {
// //         label: "Stock In",
// //         data: monthlyStock.stockIn,
// //         backgroundColor: '#10B981'
// //       },
// //       {
// //         label: "Stock Out",
// //         data: monthlyStock.stockOut,
// //         backgroundColor: '#EF4444'
// //       }
// //     ]
// //   };

// //   const trendData = {
// //     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
// //     datasets: [{
// //       label: trend.title || 'Inventory Value',
// //       data: trend.datasets[0].data,
// //       borderColor: '#3B82F6',
// //       backgroundColor: 'rgba(59, 130, 246, 0.1)',
// //       tension: 0.4,
// //       pointBackgroundColor: '#3B82F6',
// //       pointRadius: 6,
// //       fill: true,
// //     }]
// //   };

// //   return (
// //     <div className="p-6">
// //       {/* Header with Export Button */}
// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
// //             <BarChart3 className="w-8 h-8 text-indigo-600" />
// //             <span>Analytics & Reports</span>
// //           </h1>
// //           <p className="text-gray-600 mt-1">Comprehensive inventory insights</p>
// //         </div>

// //         {/* Export Dropdown */}
// //         <div className="relative">
// //           <button
// //             onClick={() => setShowExportMenu(!showExportMenu)}
// //             disabled={exporting}
// //             className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition disabled:opacity-50"
// //           >
// //             <Download className="w-5 h-5" />
// //             <span>{exporting ? 'Exporting...' : 'Export Report'}</span>
// //           </button>

// //           {showExportMenu && (
// //             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
// //               <button
// //                 onClick={() => handleExport('csv')}
// //                 className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 transition"
// //               >
// //                 <Table className="w-5 h-5 text-green-600" />
// //                 <span>Export as CSV</span>
// //               </button>
// //               <button
// //                 onClick={() => handleExport('pdf')}
// //                 className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 transition border-t"
// //               >
// //                 <FileText className="w-5 h-5 text-red-600" />
// //                 <span>Export as PDF</span>
// //               </button>
// //               <button
// //                 onClick={() => handleExport('excel')}
// //                 className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 transition border-t"
// //               >
// //                 <FileSpreadsheet className="w-5 h-5 text-blue-600" />
// //                 <span>Export as Excel</span>
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* KPI Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Total Products</p>
// //           <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Total Value</p>
// //           <p className="text-3xl font-bold text-green-600">
// //             ${stats.totalValue?.toLocaleString() || 0}
// //           </p>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Low Stock Items</p>
// //           <p className="text-3xl font-bold text-red-600">{stats.lowStockCount}</p>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <p className="text-sm text-gray-600">Active Orders</p>
// //           <p className="text-3xl font-bold text-blue-600">{stats.pendingOrders}</p>
// //         </div>
// //       </div>

// //       {/* Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //         <div className="bg-white p-6 shadow-sm rounded-lg">
// //           <h2 className="text-lg font-semibold mb-4">Top Products</h2>
// //           <div className="h-80">
// //             <Pie data={topProductData} options={{ maintainAspectRatio: false }} />
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 shadow-sm rounded-lg">
// //           <h2 className="text-lg font-semibold mb-4">Monthly Stock Movement</h2>
// //           <div className="h-80">
// //             <Bar
// //               data={monthlyStockData}
// //               options={{
// //                 maintainAspectRatio: false,
// //                 responsive: true
// //               }}
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Inventory Trend */}
// //       <div className="bg-white p-6 shadow-sm rounded-lg">
// //         <h2 className="text-lg font-semibold mb-4">Inventory Trend</h2>
// //         <div className="h-80">
// //           <Line
// //             data={trendData}
// //             options={{
// //               maintainAspectRatio: false,
// //               responsive: true
// //             }}
// //           />
// //         </div>
// //       </div>

// //       {/* Click outside to close export menu */}
// //       {showExportMenu && (
// //         <div
// //           className="fixed inset-0 z-0"
// //           onClick={() => setShowExportMenu(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default AnalyticsDashboard;





// // frontend/src/components/analytics/AnalyticsDashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { BarChart3, Download, FileText, Table, FileSpreadsheet } from 'lucide-react';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement
// } from 'chart.js';
// import { analyticsService } from '../../services/analyticsService';
// import { exportToCSV, exportToPDF, exportToExcel } from '../../utils/exportUtils';
// import toast from 'react-hot-toast';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement
// );

// const AnalyticsDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [topProducts, setTopProducts] = useState(null);
//   const [monthlyStock, setMonthlyStock] = useState(null);
//   const [trend, setTrend] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [exporting, setExporting] = useState(false);
//   const [showExportMenu, setShowExportMenu] = useState(false);

//   useEffect(() => {
//     loadAllData();
//   }, []);

//   const loadAllData = async () => {
//     try {
//       setLoading(true);

//       const [statsRes, topRes, monthlyRes, trendRes] = await Promise.all([
//         analyticsService.getDashboardStats(),
//         analyticsService.getTopProducts(10),
//         analyticsService.getMonthlyStock(),
//         analyticsService.getInventoryTrends(),
//       ]);

//       console.log('📊 Analytics Data Loaded:', {
//         stats: statsRes.data,
//         topProducts: topRes.data,
//         monthlyStock: monthlyRes.data,
//         trend: trendRes.data
//       });

//       setStats(statsRes.data);
//       setTopProducts(topRes.data);
//       setMonthlyStock(monthlyRes.data);
//       setTrend(trendRes.data);
//     } catch (err) {
//       console.error("❌ Analytics Load Error:", err);
//       toast.error('Failed to load analytics data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = async (format) => {
//     console.log('📤 Starting export...', {
//       format,
//       hasStats: !!stats,
//       hasTopProducts: !!topProducts,
//       hasMonthlyStock: !!monthlyStock,
//       hasTrend: !!trend
//     });

//     if (!stats || !topProducts || !monthlyStock || !trend) {
//       console.error('❌ Missing data for export:', { stats, topProducts, monthlyStock, trend });
//       toast.error('No data available to export');
//       return;
//     }

//     setExporting(true);
//     setShowExportMenu(false);

//     try {
//       const exportData = {
//         stats,
//         topProducts,
//         monthlyStock,
//         trend
//       };

//       console.log('📦 Export data prepared:', exportData);

//       const timestamp = new Date().toISOString().split('T')[0];
//       const filename = `smartshelfx-analytics-${timestamp}`;

//       switch (format) {
//         case 'csv':
//           console.log('📄 Exporting to CSV...');
//           await exportToCSV(exportData, `${filename}.csv`);
//           toast.success('✅ Report exported to CSV');
//           break;
//         case 'pdf':
//           console.log('📄 Exporting to PDF...');
//           await exportToPDF(exportData, `${filename}.pdf`);
//           toast.success('✅ Report exported to PDF');
//           break;
//         case 'excel':
//           console.log('📊 Exporting to Excel...');
//           await exportToExcel(exportData, `${filename}.xls`);
//           toast.success('✅ Report exported to Excel');
//           break;
//         default:
//           console.error('❌ Invalid export format:', format);
//           toast.error('Invalid export format');
//       }
//     } catch (error) {
//       console.error('❌ Export failed:', error);
//       toast.error(`Failed to export: ${error.message || 'Unknown error'}`);
//     } finally {
//       setExporting(false);
//     }
//   };

//   if (loading || !stats || !topProducts || !monthlyStock || !trend) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading analytics...</p>
//         </div>
//       </div>
//     );
//   }

//   // ⭐ Check if data is valid before rendering charts
//   const hasTopProductData = topProducts?.labels?.length > 0 && topProducts?.datasets?.[0]?.data?.length > 0;
//   const hasMonthlyStockData = monthlyStock?.labels?.length > 0 && monthlyStock?.stockIn?.length > 0;
//   const hasTrendData = trend?.datasets?.[0]?.data?.length > 0;

//   const topProductData = hasTopProductData ? {
//     labels: topProducts.labels,
//     datasets: [{
//       data: topProducts.datasets[0].data,
//       backgroundColor: [
//         '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
//         '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
//       ]
//     }]
//   } : null;

//   const monthlyStockData = hasMonthlyStockData ? {
//     labels: monthlyStock.labels,
//     datasets: [
//       {
//         label: "Stock In",
//         data: monthlyStock.stockIn || monthlyStock.datasets?.[0]?.data || [],
//         backgroundColor: '#10B981'
//       },
//       {
//         label: "Stock Out",
//         data: monthlyStock.stockOut || monthlyStock.datasets?.[1]?.data || [],
//         backgroundColor: '#EF4444'
//       }
//     ]
//   } : null;

//   const trendData = hasTrendData ? {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//     datasets: [{
//       label: trend.title || 'Inventory Value',
//       data: trend.datasets[0].data,
//       borderColor: '#3B82F6',
//       backgroundColor: 'rgba(59, 130, 246, 0.1)',
//       tension: 0.4,
//       pointBackgroundColor: '#3B82F6',
//       pointRadius: 6,
//       fill: true,
//     }]
//   } : null;

//   return (
//     <div className="p-6">
//       {/* Header with Export Button */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
//             <BarChart3 className="w-8 h-8 text-indigo-600" />
//             <span>Analytics & Reports</span>
//           </h1>
//           <p className="text-gray-600 mt-1">Comprehensive inventory insights</p>
//         </div>

//         {/* Export Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setShowExportMenu(!showExportMenu)}
//             disabled={exporting}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition disabled:opacity-50"
//           >
//             <Download className="w-5 h-5" />
//             <span>{exporting ? 'Exporting...' : 'Export Report'}</span>
//           </button>

//           {showExportMenu && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//               <button
//                 onClick={() => handleExport('csv')}
//                 className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 transition rounded-t-lg"
//               >
//                 <Table className="w-5 h-5 text-green-600" />
//                 <span>Export as CSV</span>
//               </button>
//               <button
//                 onClick={() => handleExport('pdf')}
//                 className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 transition border-t"
//               >
//                 <FileText className="w-5 h-5 text-red-600" />
//                 <span>Export as PDF</span>
//               </button>
//               <button
//                 onClick={() => handleExport('excel')}
//                 className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2 transition border-t rounded-b-lg"
//               >
//                 <FileSpreadsheet className="w-5 h-5 text-blue-600" />
//                 <span>Export as Excel</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <p className="text-sm text-gray-600">Total Products</p>
//           <p className="text-3xl font-bold text-gray-900">{stats.totalProducts || 0}</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <p className="text-sm text-gray-600">Total Value</p>
//           <p className="text-3xl font-bold text-green-600">
//             ${stats.totalValue?.toLocaleString() || '0'}
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <p className="text-sm text-gray-600">Low Stock Items</p>
//           <p className="text-3xl font-bold text-red-600">{stats.lowStockCount || 0}</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <p className="text-sm text-gray-600">Active Orders</p>
//           <p className="text-3xl font-bold text-blue-600">{stats.pendingOrders || 0}</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Top Products Chart */}
//         <div className="bg-white p-6 shadow-sm rounded-lg">
//           <h2 className="text-lg font-semibold mb-4">Top Products</h2>
//           <div className="h-80">
//             {hasTopProductData ? (
//               <Pie data={topProductData} options={{ maintainAspectRatio: false }} />
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-500">
//                 <div className="text-center">
//                   <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
//                   <p>No product data available</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Monthly Stock Movement Chart */}
//         <div className="bg-white p-6 shadow-sm rounded-lg">
//           <h2 className="text-lg font-semibold mb-4">Monthly Stock Movement</h2>
//           <div className="h-80">
//             {hasMonthlyStockData ? (
//               <Bar
//                 data={monthlyStockData}
//                 options={{
//                   maintainAspectRatio: false,
//                   responsive: true,
//                   scales: {
//                     y: {
//                       beginAtZero: true
//                     }
//                   }
//                 }}
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-500">
//                 <div className="text-center">
//                   <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
//                   <p>No monthly stock data available</p>
//                   <p className="text-sm mt-1">Add stock transactions to see data</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Inventory Trend */}
//       <div className="bg-white p-6 shadow-sm rounded-lg">
//         <h2 className="text-lg font-semibold mb-4">Inventory Trend</h2>
//         <div className="h-80">
//           {hasTrendData ? (
//             <Line
//               data={trendData}
//               options={{
//                 maintainAspectRatio: false,
//                 responsive: true,
//                 scales: {
//                   y: {
//                     beginAtZero: true
//                   }
//                 }
//               }}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               <div className="text-center">
//                 <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
//                 <p>No trend data available</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Click outside to close export menu */}
//       {showExportMenu && (
//         <div
//           className="fixed inset-0 z-0"
//           onClick={() => setShowExportMenu(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AnalyticsDashboard;


import React, { useState, useEffect } from 'react';
import { BarChart3, Download, FileText, Table, FileSpreadsheet } from 'lucide-react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
} from 'chart.js';
import { analyticsService } from '../../services/analyticsService';
import { exportToCSV, exportToPDF, exportToExcel } from '../../utils/exportUtils';
import toast from 'react-hot-toast';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState(null);
  const [monthlyStock, setMonthlyStock] = useState(null);
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);

      const [statsRes, topRes, monthlyRes, trendRes] = await Promise.all([
        analyticsService.getDashboardStats(),
        analyticsService.getTopProducts(10),
        analyticsService.getMonthlyStock(),
        analyticsService.getInventoryTrends(),
      ]);

      setStats(statsRes.data);
      setTopProducts(topRes.data);
      setMonthlyStock(monthlyRes.data);
      setTrend(trendRes.data);

    } catch (err) {
      console.error("❌ Analytics Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    if (!stats || !topProducts || !monthlyStock || !trend) {
      toast.error("No data to export");
      return;
    }

    setExporting(true);
    setShowExportMenu(false);

    try {
      const exportData = { stats, topProducts, monthlyStock, trend };
      const filename = `smartshelfx-${new Date().toISOString().split("T")[0]}`;

      if (format === "csv") await exportToCSV(exportData, `${filename}.csv`);
      if (format === "pdf") await exportToPDF(exportData, `${filename}.pdf`);
      if (format === "excel") await exportToExcel(exportData, `${filename}.xlsx`);

      toast.success("Export Successful");
    } catch (err) {
      toast.error("Export Failed");
    }

    setExporting(false);
  };

  if (loading || !stats || !topProducts || !monthlyStock || !trend) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0F1A] text-gray-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Data formatting checks
  const hasTopProductData =
    topProducts?.labels?.length > 0 &&
    topProducts?.datasets?.[0]?.data?.length > 0;

  const hasMonthlyStockData =
    monthlyStock?.labels?.length > 0 &&
    monthlyStock?.stockIn?.length > 0;

  const hasTrendData = trend?.datasets?.[0]?.data?.length > 0;

  const topProductData = hasTopProductData
    ? {
        labels: topProducts.labels,
        datasets: [
          {
            data: topProducts.datasets[0].data,
            backgroundColor: [
              '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
              '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
            ]
          }
        ]
      }
    : null;

  const monthlyStockData = hasMonthlyStockData
    ? {
        labels: monthlyStock.labels,
        datasets: [
          {
            label: "Stock In",
            data: monthlyStock.stockIn,
            backgroundColor: '#10B981'
          },
          {
            label: "Stock Out",
            data: monthlyStock.stockOut,
            backgroundColor: '#EF4444'
          }
        ]
      }
    : null;

  const trendData = hasTrendData
    ? {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: trend.title || "Inventory Trend",
            data: trend.datasets[0].data,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59,130,246,0.15)',
            pointBackgroundColor: '#3B82F6',
            fill: true,
            tension: 0.4
          }
        ]
      }
    : null;

  return (
    <div className="p-6 bg-[#0A0F1A] min-h-screen text-gray-200">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3" style={{ color: "#D2C1B6" }}>
            <BarChart3 className="w-8 h-8 text-indigo-400" />
            <span>Analytics & Reports</span>
          </h1>
          <p className="mt-1 text-gray-400">Comprehensive inventory insights</p>
        </div>

        {/* Export Button */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition"
          >
            <Download className="w-5 h-5" />
            <span>{exporting ? "Exporting..." : "Export"}</span>
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0D1322] border border-white/10 rounded-lg shadow-lg z-20">
              <button
                className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center space-x-2"
                onClick={() => handleExport("csv")}
              >
                <Table className="w-5 h-5 text-green-400" />
                <span>Export CSV</span>
              </button>
              <button
                className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center space-x-2 border-t border-white/10"
                onClick={() => handleExport("pdf")}
              >
                <FileText className="w-5 h-5 text-red-400" />
                <span>Export PDF</span>
              </button>
              <button
                className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center space-x-2 border-t border-white/10"
                onClick={() => handleExport("excel")}
              >
                <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                <span>Export Excel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Products", value: stats.totalProducts },
          { label: "Total Value", value: `$${stats.totalValue?.toLocaleString()}`, color: "text-green-400" },
          { label: "Low Stock Items", value: stats.lowStockCount, color: "text-red-400" },
          { label: "Active Orders", value: stats.pendingOrders, color: "text-indigo-400" },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#0D1322] border border-white/10 rounded-lg p-6 shadow-lg">
            <p className="text-sm text-gray-400">{item.label}</p>
            <p className={`text-3xl font-bold mt-2 ${item.color || "text-gray-200"}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* TOP PRODUCTS */}
        <div className="bg-[#0D1322] border border-white/10 shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Top Products</h2>
          <div className="h-80">
            {topProductData ? (
              <Pie data={topProductData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p className="text-gray-500 text-center mt-20">No Data</p>
            )}
          </div>
        </div>

        {/* MONTHLY STOCK MOVEMENT */}
        <div className="bg-[#0D1322] border border-white/10 shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Monthly Stock Movement</h2>
          <div className="h-80">
            {monthlyStockData ? (
              <Bar data={monthlyStockData} options={{ responsive: true, maintainAspectRatio: false }} />
            ) : (
              <p className="text-gray-500 text-center mt-20">No Data</p>
            )}
          </div>
        </div>
      </div>

      {/* INVENTORY TREND */}
      <div className="bg-[#0D1322] border border-white/10 shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Inventory Trend</h2>
        <div className="h-80">
          {trendData ? (
            <Line data={trendData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <p className="text-gray-500 text-center mt-20">No Data</p>
          )}
        </div>
      </div>

      {/* Close Export Menu */}
      {showExportMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowExportMenu(false)}></div>
      )}

    </div>
  );
};

export default AnalyticsDashboard;
