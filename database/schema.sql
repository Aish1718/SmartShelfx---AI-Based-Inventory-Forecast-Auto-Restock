-- ============================================
-- SmartShelfX Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS smartshelfx;
USE smartshelfx;

-- Drop tables if they exist (for clean installation)
DROP TABLE IF EXISTS alerts;
DROP TABLE IF EXISTS purchase_orders;
DROP TABLE IF EXISTS stock_transactions;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'MANAGER', 'VENDOR') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    vendor_id BIGINT,
    reorder_level INT NOT NULL,
    current_stock INT NOT NULL DEFAULT 0,
    category VARCHAR(100),
    price DECIMAL(10, 2),
    description VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_sku (sku),
    INDEX idx_category (category),
    INDEX idx_vendor (vendor_id),
    INDEX idx_stock_level (current_stock, reorder_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- STOCK_TRANSACTIONS TABLE
-- ============================================
CREATE TABLE stock_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    type ENUM('IN', 'OUT') NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    handled_by BIGINT,
    notes VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (handled_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product (product_id),
    INDEX idx_timestamp (timestamp),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PURCHASE_ORDERS TABLE
-- ============================================
CREATE TABLE purchase_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    vendor_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'DISPATCHED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    expected_delivery DATE,
    actual_delivery DATE,
    notes VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_status (status),
    INDEX idx_vendor (vendor_id),
    INDEX idx_product (product_id),
    INDEX idx_order_date (order_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- ALERTS TABLE
-- ============================================
CREATE TABLE alerts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    alert_type ENUM('LOW_STOCK', 'OUT_OF_STOCK', 'EXPIRY', 'FORECAST', 'VENDOR_RESPONSE') NOT NULL,
    message VARCHAR(500) NOT NULL,
    severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'MEDIUM',
    is_read BOOLEAN DEFAULT FALSE,
    is_dismissed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    dismissed_at DATETIME,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_type (alert_type),
    INDEX idx_severity (severity),
    INDEX idx_status (is_read, is_dismissed),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- FORECAST_DATA TABLE (for AI predictions)
-- ============================================
CREATE TABLE forecast_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    forecast_date DATE NOT NULL,
    predicted_demand INT NOT NULL,
    confidence_score DECIMAL(5, 2),
    actual_demand INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_forecast (product_id, forecast_date),
    INDEX idx_forecast_date (forecast_date),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SEED DATA
-- ============================================

-- Insert Default Admin User
-- Password: admin123 (BCrypt encoded)
INSERT INTO users (name, email, password, role, is_active) VALUES
('System Administrator', 'admin@smartshelfx.com', '$2a$10$5jzMKvGZWxXyU8bEKJ1O5.xGQYxH8L9CYzKfHvF6VqXxJYhFnfqEm', 'ADMIN', TRUE),
('John Manager', 'manager@smartshelfx.com', '$2a$10$5jzMKvGZWxXyU8bEKJ1O5.xGQYxH8L9CYzKfHvF6VqXxJYhFnfqEm', 'MANAGER', TRUE),
('ABC Supplies', 'vendor1@supplies.com', '$2a$10$5jzMKvGZWxXyU8bEKJ1O5.xGQYxH8L9CYzKfHvF6VqXxJYhFnfqEm', 'VENDOR', TRUE),
('XYZ Traders', 'vendor2@traders.com', '$2a$10$5jzMKvGZWxXyU8bEKJ1O5.xGQYxH8L9CYzKfHvF6VqXxJYhFnfqEm', 'VENDOR', TRUE);

-- Insert Sample Products
INSERT INTO products (name, sku, vendor_id, reorder_level, current_stock, category, price, description) VALUES
('Laptop Dell XPS 13', 'ELEC001', 3, 10, 45, 'Electronics', 1299.99, 'High-performance ultrabook with 13-inch display'),
('Wireless Mouse Logitech', 'ELEC002', 3, 20, 150, 'Electronics', 29.99, 'Ergonomic wireless mouse with USB receiver'),
('USB-C Cable 2m', 'ELEC003', 3, 50, 8, 'Electronics', 12.99, 'Durable USB-C charging cable'),
('Cotton T-Shirt Blue', 'CLTH001', 4, 50, 200, 'Clothing', 19.99, 'Comfortable 100% cotton t-shirt'),
('Jeans Denim Regular Fit', 'CLTH002', 4, 30, 25, 'Clothing', 49.99, 'Classic denim jeans'),
('Running Shoes Nike', 'CLTH003', 4, 20, 60, 'Clothing', 89.99, 'Professional running shoes'),
('Organic Apples 1kg', 'FOOD001', NULL, 20, 100, 'Food', 4.99, 'Fresh organic apples'),
('Whole Wheat Bread', 'FOOD002', NULL, 30, 5, 'Food', 3.49, 'Freshly baked whole wheat bread'),
('Coffee Beans 500g', 'FOOD003', NULL, 15, 40, 'Food', 14.99, 'Premium arabica coffee beans'),
('Office Desk Oak', 'FURN001', 4, 5, 12, 'Furniture', 299.99, 'Solid oak office desk'),
('Ergonomic Chair', 'FURN002', 4, 8, 3, 'Furniture', 199.99, 'Comfortable office chair with lumbar support'),
('Python Programming Book', 'BOOK001', NULL, 10, 25, 'Books', 39.99, 'Comprehensive Python programming guide'),
('JavaScript The Good Parts', 'BOOK002', NULL, 10, 18, 'Books', 29.99, 'Essential JavaScript programming concepts'),
('LED Desk Lamp', 'ELEC004', 3, 15, 35, 'Electronics', 34.99, 'Adjustable LED desk lamp with USB port'),
('Yoga Mat Premium', 'SPRT001', NULL, 10, 22, 'Sports', 24.99, 'Non-slip yoga mat with carrying strap');

-- Insert Sample Stock Transactions
INSERT INTO stock_transactions (product_id, quantity, type, handled_by, notes) VALUES
(1, 50, 'IN', 2, 'Initial stock'),
(2, 200, 'IN', 2, 'Bulk order received'),
(3, 30, 'IN', 2, 'New shipment'),
(1, 5, 'OUT', 2, 'Sales order #1001'),
(2, 50, 'OUT', 2, 'Bulk sale to corporate client'),
(4, 300, 'IN', 2, 'Summer collection'),
(8, 50, 'IN', 2, 'Fresh bakery delivery'),
(8, 45, 'OUT', 2, 'Daily sales');

-- Insert Sample Purchase Orders
INSERT INTO purchase_orders (product_id, vendor_id, quantity, status, expected_delivery, notes) VALUES
(3, 3, 100, 'PENDING', DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'Urgent restock required'),
(8, 4, 200, 'APPROVED', DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'Weekly bread order'),
(11, 4, 10, 'PENDING', DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'Office furniture restocking'),
(2, 3, 100, 'DISPATCHED', DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'In transit'),
(5, 4, 50, 'DELIVERED', CURDATE(), 'Delivered successfully');

-- Insert Sample Alerts
INSERT INTO alerts (product_id, alert_type, message, severity, is_read) VALUES
(3, 'LOW_STOCK', 'USB-C Cable 2m stock is below reorder level (8/50)', 'HIGH', FALSE),
(8, 'LOW_STOCK', 'Whole Wheat Bread stock is below reorder level (5/30)', 'CRITICAL', FALSE),
(11, 'LOW_STOCK', 'Ergonomic Chair stock is below reorder level (3/8)', 'HIGH', FALSE),
(1, 'FORECAST', 'Predicted high demand for Laptop Dell XPS 13 next week', 'MEDIUM', TRUE);

-- ============================================
-- VIEWS FOR REPORTING
-- ============================================

-- View: Low Stock Products
CREATE OR REPLACE VIEW v_low_stock_products AS
SELECT
    p.id,
    p.sku,
    p.name,
    p.category,
    p.current_stock,
    p.reorder_level,
    p.price,
    u.name as vendor_name,
    u.email as vendor_email
FROM products p
LEFT JOIN users u ON p.vendor_id = u.id
WHERE p.current_stock < p.reorder_level;

-- View: Inventory Value Summary
CREATE OR REPLACE VIEW v_inventory_value AS
SELECT
    category,
    COUNT(*) as product_count,
    SUM(current_stock) as total_stock,
    SUM(current_stock * price) as total_value
FROM products
GROUP BY category;

-- View: Recent Transactions
CREATE OR REPLACE VIEW v_recent_transactions AS
SELECT
    st.id,
    st.type,
    st.quantity,
    st.timestamp,
    st.notes,
    p.name as product_name,
    p.sku,
    u.name as handled_by_name
FROM stock_transactions st
JOIN products p ON st.product_id = p.id
LEFT JOIN users u ON st.handled_by = u.id
ORDER BY st.timestamp DESC;

-- View: Pending Purchase Orders
CREATE OR REPLACE VIEW v_pending_orders AS
SELECT
    po.id,
    po.quantity,
    po.status,
    po.order_date,
    po.expected_delivery,
    p.name as product_name,
    p.sku,
    v.name as vendor_name,
    v.email as vendor_email
FROM purchase_orders po
JOIN products p ON po.product_id = p.id
JOIN users v ON po.vendor_id = v.id
WHERE po.status IN ('PENDING', 'APPROVED', 'DISPATCHED');

-- ============================================
-- STORED PROCEDURES
-- ============================================

DELIMITER //

-- Procedure: Process Stock Transaction
CREATE PROCEDURE sp_process_stock_transaction(
    IN p_product_id BIGINT,
    IN p_quantity INT,
    IN p_type ENUM('IN', 'OUT'),
    IN p_handled_by BIGINT,
    IN p_notes VARCHAR(255)
)
BEGIN
    DECLARE current_stock_value INT;

    -- Start transaction
    START TRANSACTION;

    -- Get current stock
    SELECT current_stock INTO current_stock_value
    FROM products
    WHERE id = p_product_id
    FOR UPDATE;

    -- Update stock based on transaction type
    IF p_type = 'IN' THEN
        UPDATE products
        SET current_stock = current_stock + p_quantity
        WHERE id = p_product_id;
    ELSE
        IF current_stock_value >= p_quantity THEN
            UPDATE products
            SET current_stock = current_stock - p_quantity
            WHERE id = p_product_id;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Insufficient stock for transaction';
        END IF;
    END IF;

    -- Insert transaction record
    INSERT INTO stock_transactions (product_id, quantity, type, handled_by, notes)
    VALUES (p_product_id, p_quantity, p_type, p_handled_by, p_notes);

    -- Check if stock is low and create alert
    IF (SELECT current_stock < reorder_level FROM products WHERE id = p_product_id) THEN
        INSERT INTO alerts (product_id, alert_type, message, severity)
        SELECT
            id,
            'LOW_STOCK',
            CONCAT(name, ' stock is below reorder level (', current_stock, '/', reorder_level, ')'),
            CASE
                WHEN current_stock = 0 THEN 'CRITICAL'
                WHEN current_stock < reorder_level / 2 THEN 'HIGH'
                ELSE 'MEDIUM'
            END
        FROM products
        WHERE id = p_product_id
        AND NOT EXISTS (
            SELECT 1 FROM alerts
            WHERE product_id = p_product_id
            AND alert_type = 'LOW_STOCK'
            AND is_dismissed = FALSE
        );
    END IF;

    COMMIT;
END //

DELIMITER ;

-- ============================================
-- TRIGGERS
-- ============================================

DELIMITER //

-- Trigger: Update product timestamp on stock change
CREATE TRIGGER tr_product_update_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

-- Trigger: Auto-create alert on new purchase order
CREATE TRIGGER tr_create_po_alert
AFTER INSERT ON purchase_orders
FOR EACH ROW
BEGIN
    INSERT INTO alerts (product_id, alert_type, message, severity)
    SELECT
        p.id,
        'VENDOR_RESPONSE',
        CONCAT('New purchase order #', NEW.id, ' created for ', p.name),
        'LOW'
    FROM products p
    WHERE p.id = NEW.product_id;
END //

DELIMITER ;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Additional composite indexes
CREATE INDEX idx_product_stock_reorder ON products(current_stock, reorder_level);
CREATE INDEX idx_alert_status ON alerts(is_read, is_dismissed, created_at);
CREATE INDEX idx_transaction_date ON stock_transactions(timestamp, type);
CREATE INDEX idx_po_status_date ON purchase_orders(status, order_date);

-- ============================================
-- GRANT PERMISSIONS (Optional)
-- ============================================

-- Create application user
-- CREATE USER 'smartshelfx_user'@'localhost' IDENTIFIED BY 'your_secure_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON smartshelfx.* TO 'smartshelfx_user'@'localhost';
-- FLUSH PRIVILEGES;

-- ============================================
-- END OF SCHEMA
-- ============================================