-- ============================================
-- V3 STORED PROCEDURES & TRIGGERS
-- ============================================

DELIMITER //

CREATE PROCEDURE sp_process_stock_transaction(
    IN p_product_id BIGINT,
    IN p_quantity INT,
    IN p_type ENUM('IN', 'OUT'),
    IN p_handled_by BIGINT,
    IN p_notes VARCHAR(255)
)
BEGIN
    DECLARE current_stock_value INT;

    START TRANSACTION;

    SELECT current_stock INTO current_stock_value
    FROM products
    WHERE id = p_product_id FOR UPDATE;

    IF p_type = 'IN' THEN
        UPDATE products SET current_stock = current_stock + p_quantity
        WHERE id = p_product_id;
    ELSE
        IF current_stock_value >= p_quantity THEN
            UPDATE products SET current_stock = current_stock - p_quantity
            WHERE id = p_product_id;
        ELSE
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Insufficient stock';
        END IF;
    END IF;

    INSERT INTO stock_transactions (product_id, quantity, type, handled_by, notes)
    VALUES (p_product_id, p_quantity, p_type, p_handled_by, p_notes);

    COMMIT;
END //

-- Trigger: auto update timestamp
CREATE TRIGGER tr_product_update_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

-- Trigger: create purchase order alert
CREATE TRIGGER tr_create_po_alert
AFTER INSERT ON purchase_orders
FOR EACH ROW
BEGIN
    INSERT INTO alerts (product_id, alert_type, message, severity)
    VALUES (
        NEW.product_id,
        'VENDOR_RESPONSE',
        CONCAT('New purchase order #', NEW.id),
        'LOW'
    );
END //

DELIMITER ;
