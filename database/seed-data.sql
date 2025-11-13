USE smartshelfx;

-- USERS
INSERT INTO users (name, email, password, role, is_active) VALUES
('System Administrator', 'admin@smartshelfx.com', '$2a$10$5jzMKvGZWxXyU8bEKJ1O5.xGQYxH8L9CYzKfHvF6VqXxJYhFnfqEm', 'ADMIN', TRUE),
('John Manager', 'manager@smartshelfx.com', '$2a$10$5jzMKvGZWxXyU8bEKJ1O5.xGQYxH8L9CYzKfHvF6VqXxJYhFnfqEm', 'MANAGER', TRUE),
('ABC Supplies', 'vendor1@supplies.com', '$2a$10$5jzMKvGZWxXyU8bEKJ1O5.xGQYxH8L9CYzKfHvF6VqXxJYhFnfqEm', 'VENDOR', TRUE),
('XYZ Traders', 'vendor2@traders.com', '$2a$10$5jzMKvGZWxXyU8bEKJ1O5.xGQYxH8L9CYzKfHvF6VqXxJYhFnfqEm', 'VENDOR', TRUE);

-- PRODUCTS
INSERT INTO products (name, sku, vendor_id, reorder_level, current_stock, category, price, description) VALUES
('Laptop Dell XPS 13', 'ELEC001', 3, 10, 45, 'Electronics', 1299.99, 'High-performance ultrabook with 13-inch display'),
('Wireless Mouse Logitech', 'ELEC002', 3, 20, 150, 'Electronics', 29.99, 'Ergonomic wireless mouse'),
('USB-C Cable 2m', 'ELEC003', 3, 50, 8, 'Electronics', 12.99, 'Durable USB-C cable'),
('Cotton T-Shirt Blue', 'CLTH001', 4, 50, 200, 'Clothing', 19.99, 'Cotton t-shirt'),
('Jeans Denim Regular Fit', 'CLTH002', 4, 30, 25, 'Clothing', 49.99, 'Regular fit denim'),
('Running Shoes Nike', 'CLTH003', 4, 20, 60, 'Clothing', 89.99, 'Professional running shoes');

-- TRANSACTIONS
INSERT INTO stock_transactions (product_id, quantity, type, handled_by, notes) VALUES
(1, 50, 'IN', 2, 'Initial stock'),
(2, 200, 'IN', 2, 'Bulk order'),
(3, 30, 'IN', 2, 'Shipment'),
(1, 5, 'OUT', 2, 'Sales order #1001');

-- PURCHASE ORDERS
INSERT INTO purchase_orders (product_id, vendor_id, quantity, status, expected_delivery, notes) VALUES
(3, 3, 100, 'PENDING', DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'Restock required'),
(8, 4, 200, 'APPROVED', DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'Weekly order');

-- ALERTS
INSERT INTO alerts (product_id, alert_type, message, severity, is_read) VALUES
(3, 'LOW_STOCK', 'USB-C cable below reorder level', 'HIGH', FALSE);
