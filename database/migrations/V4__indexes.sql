-- ============================================
-- V4 ADDITIONAL INDEXES
-- ============================================

CREATE INDEX idx_product_stock_reorder ON products(current_stock, reorder_level);
CREATE INDEX idx_alert_status ON alerts(is_read, is_dismissed, created_at);
CREATE INDEX idx_transaction_date ON stock_transactions(timestamp, type);
CREATE INDEX idx_po_status_date ON purchase_orders(status, order_date);
