// src/components/vendor/dashboard/VendorStats.jsx
import React from 'react';

const StatCard = ({ title, value, color }) => (
  <div style={{
    background: '#fff', borderRadius: 10, padding: 16, boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
  }}>
    <div>
      <div style={{ fontSize: 12, color: '#666' }}>{title}</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
    </div>
    <div style={{
      width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: color || '#eee'
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  </div>
);

const VendorStats = ({ stats = {} }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
      <StatCard title="Total Orders" value={stats.total || 0} color="#f0f6ff" />
      <StatCard title="Pending" value={stats.pending || 0} color="#fff7e6" />
      <StatCard title="Approved" value={stats.approved || 0} color="#eef9f0" />
      <StatCard title="In Transit" value={stats.inTransit || 0} color="#f4f0ff" />
      <StatCard title="Delivered" value={stats.delivered || 0} color="#e9f9f0" />
    </div>
  );
};

export default VendorStats;
