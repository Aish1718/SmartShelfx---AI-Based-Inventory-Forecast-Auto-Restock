-- ============================================
-- V1 INITIAL SCHEMA (TABLES ONLY)
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
);

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
);

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
);

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
);

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
);

CREATE TABLE forecast_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    forecast_date DATE NOT NULL,
    predicted_demand INT NOT NULL,
    confidence_score DECIMAL(5, 2),
    actual_demand INT,_
