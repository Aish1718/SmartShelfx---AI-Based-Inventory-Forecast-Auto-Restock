# 📂 SmartShelfX — Database Documentation

This folder contains the **complete database layer** for the SmartShelfX system.
It includes the **schema**, **migrations**, **views**, **stored procedures**, **triggers**,
**performance indexes**, and **sample seed data**.

The database is built on **MySQL 8** and works seamlessly with Flyway, Docker, and the backend.

---

## 📁 Folder Structure

database/
│── migration/
│ ├── V1__initial_schema.sql
│ ├── V2__create_views.sql
│ ├── V3__procedures_triggers.sql
│ ├── V4__indexes.sql
│
│── schema.sql
│── seed-data.sql
│── README.md



### 📌 **migration/**
Contains **Flyway-style versioned migration files**:

| Version | Description |
|--------|-------------|
| **V1__initial_schema.sql** | Core tables (users, products, stock, purchase orders, alerts, forecast_data) |
| **V2__create_views.sql** | Analytics views (low stock, inventory value, transactions, pending POs) |
| **V3__procedures_triggers.sql** | Stored procedures + triggers |
| **V4__indexes.sql** | Additional composite indexes for performance |

### 📌 **schema.sql**
A **full build script** containing ALL tables, triggers, SPs, views, and indexes.
Used for fresh installations or standalone DB builds.

### 📌 **seed-data.sql**
Sample data for testing:
- Admin / Manager / Vendor users
- Product catalog (Electronics, Clothing, Food, Furniture, Books)
- Stock transactions
- Purchase orders
- Alerts

---

## 🛠️ How to Use the Database

### 1️⃣ **Using Flyway (Recommended)**

Inside the backend, Flyway will automatically run:

```bash
migration/V1__initial_schema.sql
migration/V2__create_views.sql
migration/V3__procedures_triggers.sql
migration/V4__indexes.sql


# To trigger Flyway manually:

mvn flyway:migrate


# To clean DB:

mvn flyway:clean


Using Docker (with docker-compose)

Create and start MySQL + phpMyAdmin:

docker-compose up -d db phpmyadmin


The database automatically loads the schema from the backend (mapped volumes).

Creating Database Manually

Run:

SOURCE schema.sql;
SOURCE seed-data.sql;



🧱 Database Schema Overview
✔ Tables Included

users – Admins, managers, vendors

products – SKU, vendor link, stock levels

stock_transactions – IN/OUT movement

purchase_orders – Vendor ordering system

alerts – Forecast, low stock, vendor, expiry alerts

forecast_data – AI-service predictions

📊 Views

v_low_stock_products

v_inventory_value

v_recent_transactions

v_pending_orders

Used for analytics dashboards.

⚙️ Stored Procedures

sp_process_stock_transaction
(Handles IN/OUT logic, stock validation, auto-alerting)

🧲 Triggers

Update product timestamp on stock change

Auto-create alert when new purchase order is created

🚀 Indexes Included

Composite indexes for improved query speed:

Product reorder & stock

Alerts status & type

Transaction timestamp & type

Purchase order status & date

🧪 Seeding Data

Run after schema creation:

SOURCE seed-data.sql;


Provides:

4 default users

15 sample products

Transactions

Purchase orders

Alerts

Useful for:
✔ Testing
✔ UI demos
✔ Local development