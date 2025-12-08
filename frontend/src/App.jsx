// // frontend/src/App.jsx

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import LandingPage from "./components/landing/LandingPage";
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';


// import { AuthProvider } from "./context/AuthContext";
// import Dashboard from "./components/dashboard/Dashboard";
// import ProductList from "./components/products/ProductList";
// import StockIn from "./components/transactions/StockIn";
// import StockOut from "./components/transactions/StockOut";
// import TransactionHistory from "./components/transactions/TransactionHistory";
// import ForecastDashboard from "./components/forecast/ForecastDashboard";
// import PurchaseOrderList from "./components/purchase-orders/PurchaseOrderList";
// import AlertList from "./components/alerts/AlertList";
// import AnalyticsDashboard from "./components/analytics/AnalyticsDashboard";
// import Navbar from "./components/common/Navbar";
// import Sidebar from "./components/common/Sidebar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";

// // import BuyerLayout from "./components/buyer/BuyerLayout";
// // import BuyerHome from "./components/buyer/BuyerHome";
// // import WishlistPage from "./components/buyer/WishlistPage";
// // import PurchaseHistory from "./components/buyer/PurchaseHistory";

// import VendorDashboard from './components/vendor/dashboard/VendorDashboard';

// import "./index.css";

// // Main admin layout
// const Layout = ({ children }) => (
//   <div className="min-h-screen bg-gray-50">
//     <Navbar />
//     <Sidebar />
//     <div className="ml-64 pt-20">{children}</div>
//   </div>
// );

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>

//           {/* PUBLIC ROUTES */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />


//           {/* ADMIN / MANAGER PROTECTED ROUTES */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <Dashboard />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/products"
//             element={
//               <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
//                 <Layout>
//                   <ProductList />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/transactions"
//             element={
//               <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
//                 <Layout>
//                   <TransactionHistory />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/transactions/stock-in"
//             element={
//               <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
//                 <Layout>
//                   <StockIn />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/transactions/stock-out"
//             element={
//               <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
//                 <Layout>
//                   <StockOut />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/forecast"
//             element={
//               <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
//                 <Layout>
//                   <ForecastDashboard />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/purchase-orders"
//             element={
//               <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
//                 <Layout>
//                   <PurchaseOrderList />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/alerts"
//             element={
//               <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
//                 <Layout>
//                   <AlertList />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/analytics"
//             element={
//               <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
//                 <Layout>
//                   <AnalyticsDashboard />
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />

//             <Route
//               path="/vendor/dashboard"
//               element={
//                 <ProtectedRoute roles={["VENDOR"]}>
//                   <Layout>
//                     <VendorDashboard />
//                   </Layout>
//                 </ProtectedRoute>
//             }
//           />


//             <Route
//               path="/vendor/orders"
//               element={
//                 <ProtectedRoute roles={["VENDOR"]}>
//                   <Layout>
//                     <PurchaseOrderList />
//                   </Layout>
//                 </ProtectedRoute>
//               }
//             />


//           {/* BUYER ROUTES
//           <Route path="/buyer/home" element={<BuyerLayout><BuyerHome /></BuyerLayout>} />
//           <Route path="/buyer/wishlist" element={<BuyerLayout><WishlistPage /></BuyerLayout>} />
//           <Route path="/buyer/purchases" element={<BuyerLayout><PurchaseHistory /></BuyerLayout>} /> */}

//           {/* 404 fallback */}
//           <Route path="*" element={<LandingPage />} />

//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;



// frontend/src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; // ⭐ ADD THIS

import LandingPage from "./components/landing/LandingPage";
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/dashboard/Dashboard";
import ProductList from "./components/products/ProductList";
import StockIn from "./components/transactions/StockIn";
import StockOut from "./components/transactions/StockOut";
import TransactionHistory from "./components/transactions/TransactionHistory";
import ForecastDashboard from "./components/forecast/ForecastDashboard";
import PurchaseOrderList from "./components/purchase-orders/PurchaseOrderList";
import AlertList from "./components/alerts/AlertList";
import AnalyticsDashboard from "./components/analytics/AnalyticsDashboard";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import VendorDashboard from './components/vendor/dashboard/VendorDashboard';


import ViewUsers from "./components/admin/ViewUsers";
import PurchaseOrderDetails from "./components/purchase-orders/PurchaseOrderDetails";



import "./index.css";

// Main admin layout
const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#0b1220] text-[var(--text)]">
    <Navbar />
    <Sidebar />
    <div className="ml-64 pt-20">{children}</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* ⭐ ADD TOASTER HERE */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ADMIN / MANAGER PROTECTED ROUTES */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          /> */}

          <Route
  path="/dashboard"
  element={
    <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
      <Layout>
        <AnalyticsDashboard />
      </Layout>
    </ProtectedRoute>
  }
/>


          <Route
            path="/products"
            element={
              <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                <Layout>
                  <ProductList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                <Layout>
                  <TransactionHistory />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions/stock-in"
            element={
              <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                <Layout>
                  <StockIn />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions/stock-out"
            element={
              <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                <Layout>
                  <StockOut />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/forecast"
            element={
              <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                <Layout>
                  <ForecastDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/purchase-orders"
            element={
              <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                <Layout>
                  <PurchaseOrderList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/alerts"
            element={
              <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                <Layout>
                  <AlertList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                <Layout>
                  <AnalyticsDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute roles={["VENDOR"]}>
                <Layout>
                  <PurchaseOrderList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor/orders"
            element={
              <ProtectedRoute roles={["VENDOR","ROLE_VENDOR"]}>
                <Layout>
                  <PurchaseOrderList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <Layout>
                    <ViewUsers />
                  </Layout>
                </ProtectedRoute>
            }
          />


          <Route
              path="/purchase-orders/:id"
              element={
                <ProtectedRoute roles={["ADMIN", "MANAGER", "VENDOR"]}>
                  <Layout>
                    <PurchaseOrderDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />



          {/* 404 fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
