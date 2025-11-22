// src/components/vendor/dashboard/VendorDashboard.jsx
import React, { useEffect, useState } from 'react';
import VendorStats from './VendorStats';
import VendorCharts from './VendorCharts';
import vendorService from '../../../services/vendorService';

const VendorDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // derive vendorId from localStorage user (adjust if you store differently)
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;
  const vendorId = user?.id;

  useEffect(() => {
    if (!vendorId) {
      setError('Vendor not logged in.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    vendorService.getVendorOrders(vendorId)
      .then(data => {
        if (!cancelled) {
          setOrders(data || []);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          console.error(err);
          setError('Failed to fetch vendor orders');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [vendorId]);

  // compute stats
  const stats = orders.reduce((acc, o) => {
    const st = (o.status || '').toString().toUpperCase();
    acc.total++;
    if (st.includes('PENDING')) acc.pending++;
    if (st.includes('APPROVED')) acc.approved++;
    if (st.includes('IN_TRANSIT') || st.includes('IN TRANSIT') || st.includes('TRANSIT')) acc.inTransit++;
    if (st.includes('DELIVERED')) acc.delivered++;
    if (st.includes('REJECT') || st.includes('CANCEL')) acc.rejected++;
    return acc;
  }, { total: 0, pending: 0, approved: 0, inTransit: 0, delivered: 0, rejected: 0 });

  return (
    <div className="vendor-dashboard" style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 12 }}>Vendor Dashboard</h2>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {!loading && !error && (
        <>
          <VendorStats stats={stats} />

          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 420px', gap: 24 }}>
            <div>
              <div style={{
                background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
              }}>
                <h3 style={{ margin: 0, marginBottom: 12 }}>Recent Orders</h3>
                {orders.length === 0 ? (
                  <div>No orders yet.</div>
                ) : (
                  <div>
                    {orders.slice(0, 8).map(o => (
                      <div key={o.id} style={{
                        display: 'flex', justifyContent: 'space-between', padding: '12px 8px',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{o.product?.name || '—'}</div>
                          <div style={{ fontSize: 12, color: '#666' }}>#{o.id} • {o.quantity} pcs</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 600 }}>${o.totalCost ?? '0.00'}</div>
                          <div style={{ fontSize: 12, color: '#666' }}>{o.expectedDelivery ?? '—'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <VendorCharts orders={orders} />
          </div>
        </>
      )}
    </div>
  );
};

export default VendorDashboard;
