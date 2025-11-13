-- Run this to create sample data for testing forecasts

USE smartshelfx;

-- Create 60 days of transaction history for Product 1
INSERT INTO stock_transactions (product_id, quantity, type, timestamp, handled_by, notes)
SELECT
    1 as product_id,
    FLOOR(3 + (RAND() * 5)) as quantity,
    'OUT' as type,
    DATE_SUB(NOW(), INTERVAL n DAY) as timestamp,
    2 as handled_by,
    CONCAT('Sample transaction day ', n) as notes
FROM (
    SELECT a.N + b.N * 10 as n
    FROM
        (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
         UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
        (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
         UNION SELECT 5) b
    WHERE a.N + b.N * 10 < 60
) numbers;

-- Create 60 days of transaction history for Product 2
INSERT INTO stock_transactions (product_id, quantity, type, timestamp, handled_by, notes)
SELECT
    2 as product_id,
    FLOOR(10 + (RAND() * 10)) as quantity,
    'OUT' as type,
    DATE_SUB(NOW(), INTERVAL n DAY) as timestamp,
    2 as handled_by,
    CONCAT('Sample transaction day ', n) as notes
FROM (
    SELECT a.N + b.N * 10 as n
    FROM
        (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
         UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
        (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
         UNION SELECT 5) b
    WHERE a.N + b.N * 10 < 60
) numbers;

-- Verify data
SELECT
    p.id,
    p.name,
    COUNT(st.id) as total_transactions,
    MIN(DATE(st.timestamp)) as first_date,
    MAX(DATE(st.timestamp)) as last_date,
    SUM(st.quantity) as total_quantity
FROM products p
LEFT JOIN stock_transactions st ON p.id = st.product_id AND st.type = 'OUT'
WHERE p.id IN (1, 2)
GROUP BY p.id, p.name;