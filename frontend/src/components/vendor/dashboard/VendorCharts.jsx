// src/components/vendor/dashboard/VendorCharts.jsx
import React, { useMemo } from 'react';

const simpleBarHeight = (value, max) => {
  if (!max) return 6;
  return Math.max(6, Math.round((value / max) * 80));
};

const VendorCharts = ({ orders = [] }) => {
  // orders per status
  const counts = useMemo(() => {
    const c = { pending: 0, approved: 0, inTransit: 0, delivered: 0, rejected: 0 };
    orders.forEach(o => {
      const st = (o.status || '').toString().toUpperCase();
      if (st.includes('PENDING')) c.pending++;
      else if (st.includes('APPROVED')) c.approved++;
      else if (st.includes('IN_TRANSIT') || st.includes('IN TRANSIT') || st.includes('TRANSIT')) c.inTransit++;
      else if (st.includes('DELIVERED')) c.delivered++;
      else if (st.includes('REJECT') || st.includes('CANCEL')) c.rejected++;
    });
    return c;
  }, [orders]);

  const max = Math.max(...Object.values(counts), 1);

  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <h4 style={{ marginTop: 0 }}>Orders Overview</h4>
      <div style={{ display: 'grid', gap: 10 }}>
        {[
          { key: 'pending', label: 'Pending', color: '#f6d365' },
          { key: 'approved', label: 'Approved', color: '#9ae6b4' },
          { key: 'inTransit', label: 'In Transit', color: '#c7b7ff' },
          { key: 'delivered', label: 'Delivered', color: '#b7f0d0' },
          { key: 'rejected', label: 'Rejected', color: '#ffd6d6' },
        ].map(item => (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 90, fontSize: 13, color: '#555' }}>{item.label}</div>
            <div style={{ flex: 1, background: '#f5f7fa', borderRadius: 6, height: 12, position: 'relative' }}>
              <div style={{
                height: '100%',
                width: `${(counts[item.key] / max) * 100}%`,
                background: item.color,
                borderRadius: 6,
                transition: 'width 300ms'
              }} />
            </div>
            <div style={{ width: 36, textAlign: 'right', fontWeight: 600 }}>{counts[item.key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorCharts;
