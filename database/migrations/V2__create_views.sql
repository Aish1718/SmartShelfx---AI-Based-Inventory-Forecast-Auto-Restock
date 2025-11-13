-- ============================================
-- V2 CREATE REPORTING VIEWS
-- ============================================

CREATE OR REPLACE VIEW v_low_stock_products AS
SELECT
    p.id, p.sku, p.name, p.category,
    p.current_stock, p.reorder_level, p.price,
    u.name AS vendor_name, u.email AS vendor_email
FROM products p
LEFT JOIN users u ON p.vendor_id = u.id
WHERE p.current_stock < p.reorder_level;

CREATE OR REPLACE VIEW v_inventory_value AS
SELECT
    category,
    COUNT(*) AS product_count,
    SUM(current_stock) AS total_stock,
    SUM(current_stock * price) AS total_value
FROM products
GROUP BY category;

CREATE OR REPLACE VIEW v_recent_transactions AS
SELECT
    st.id, st.type, st.quantity, st.timestamp, st.notes,
    p.name AS product_name, p.sku,
    u.name AS handled_by_name
FROM stock_transactions st
JOIN products p ON st.product_id = p.id
LEFT JOIN users u ON st.handled_by = u.id
ORDER BY st.timestamp DESC;

CREATE OR REPLACE VIEW v_pending_orders AS
SELECT
    po.id, po.quantity, po.status, po.order_date, po.expected_delivery,
    p.name AS product_name, p.sku,
    v.name AS vendor_name, v.email AS vendor_email
FROM purchase_orders po
JOIN products p ON po.product_id = p.id
JOIN users v ON po.vendor_id = v.id
WHERE po.status IN ('PENDING', 'APPROVED', 'DISPATCHED');
