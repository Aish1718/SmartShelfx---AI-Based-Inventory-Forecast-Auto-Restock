import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ProductList from './components/products/ProductList';
import StockIn from './components/transactions/StockIn';
import StockOut from './components/transactions/StockOut';
import TransactionHistory from './components/transactions/TransactionHistory';
import ForecastDashboard from './components/forecast/ForecastDashboard';
import PurchaseOrderList from './components/purchase-orders/PurchaseOrderList';
import AlertList from './components/alerts/AlertList';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './index.css';

// Layout wrapper for authenticated pages
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <Sidebar />
    <div className="ml-64 pt-20">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                <Layout>
                  <ProductList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                <Layout>
                  <TransactionHistory />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions/stock-in"
            element={
              <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                <Layout>
                  <StockIn />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions/stock-out"
            element={
              <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                <Layout>
                  <StockOut />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/forecast"
            element={
              <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                <Layout>
                  <ForecastDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/purchase-orders"
            element={
              <ProtectedRoute>
                <Layout>
                  <PurchaseOrderList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/alerts"
            element={
              <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                <Layout>
                  <AlertList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                <Layout>
                  <AnalyticsDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 - Not Found */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;