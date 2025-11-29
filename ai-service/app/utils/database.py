# # ai-service/app/utils/database.py
# # import mysql.connector
# # from mysql.connector import Error
# # from app.config import Config
# # import pandas as pd
# # from datetime import datetime, timedelta

# # class DatabaseConnection:
# #     def __init__(self):
# #         self.config = Config.DB_CONFIG
# #         self.connection = None

# #     def connect(self):
# #         """Establish database connection"""
# #         try:
# #             self.connection = mysql.connector.connect(**self.config)
# #             if self.connection.is_connected():
# #                 return self.connection
# #         except Error as e:
# #             print(f"Error connecting to MySQL: {e}")
# #             return None

# #     def disconnect(self):
# #         """Close database connection"""
# #         if self.connection and self.connection.is_connected():
# #             self.connection.close()

# #     def get_historical_data(self, product_id, days=90):
# #         """
# #         Fetch historical transaction data for a product
# #         """
# #         try:
# #             connection = self.connect()
# #             if not connection:
# #                 return None

# #             query = """
# #                 SELECT
# #                     DATE(st.timestamp) as transaction_date,
# #                     SUM(CASE WHEN st.type = 'OUT' THEN st.quantity ELSE 0 END) as quantity_out,
# #                     SUM(CASE WHEN st.type = 'IN' THEN st.quantity ELSE 0 END) as quantity_in
# #                 FROM stock_transactions st
# #                 WHERE st.product_id = %s
# #                   AND st.timestamp >= DATE_SUB(NOW(), INTERVAL %s DAY)
# #                 GROUP BY DATE(st.timestamp)
# #                 ORDER BY transaction_date ASC
# #             """

# #             df = pd.read_sql(query, connection, params=(product_id, days))
# #             self.disconnect()

# #             return df

# #         except Error as e:
# #             print(f"Error fetching historical data: {e}")
# #             self.disconnect()
# #             return None

# #     def get_all_products(self):
# #         """Fetch all products"""
# #         try:
# #             connection = self.connect()
# #             if not connection:
# #                 return None

# #             query = """
# #                 SELECT
# #                     id,
# #                     name,
# #                     sku,
# #                     currentStock,
# #                     reorderLevel,
# #                     category
# #                 FROM products
# #                 ORDER BY name
# #             """

# #             df = pd.read_sql(query, connection)
# #             self.disconnect()

# #             return df

# #         except Error as e:
# #             print(f"Error fetching products: {e}")
# #             self.disconnect()
# #             return None

# #     def get_product_info(self, product_id):
# #         """Fetch product information"""
# #         try:
# #             connection = self.connect()
# #             if not connection:
# #                 return None

# #             query = """
# #                 SELECT
# #                     id,
# #                     name,
# #                     sku,
# #                     currentStock,
# #                     reorderLevel,
# #                     category,
# #                     price
# #                 FROM products
# #                 WHERE id = %s
# #             """

# #             cursor = connection.cursor(dictionary=True)
# #             cursor.execute(query, (product_id,))
# #             result = cursor.fetchone()

# #             cursor.close()
# #             self.disconnect()

# #             return result

# #         except Error as e:
# #             print(f"Error fetching product info: {e}")
# #             self.disconnect()
# #             return None

# #     def save_forecast(self, product_id, forecast_data):
# #         """Save forecast predictions to database"""
# #         try:
# #             connection = self.connect()
# #             if not connection:
# #                 return False

# #             cursor = connection.cursor()

# #             # Insert or update forecast data
# #             query = """
# #                 INSERT INTO forecast_data
# #                 (product_id, forecast_date, predicted_demand, confidence_score)
# #                 VALUES (%s, %s, %s, %s)
# #                 ON DUPLICATE KEY UPDATE
# #                 predicted_demand = VALUES(predicted_demand),
# #                 confidence_score = VALUES(confidence_score)
# #             """

# #             for _, row in forecast_data.iterrows():
# #                 cursor.execute(query, (
# #                     product_id,
# #                     row['date'],
# #                     int(row['predicted_demand']),
# #                     float(row['confidence_score'])
# #                 ))

# #             connection.commit()
# #             cursor.close()
# #             self.disconnect()

# #             return True

# #         except Error as e:
# #             print(f"Error saving forecast: {e}")
# #             self.disconnect()
# #             return False




# # ai-service/app/utils/database.py
# # COMPLETE VERSION - Adapted to your existing schema

# import mysql.connector
# from mysql.connector import Error
# from app.config import Config
# import pandas as pd
# from datetime import datetime, timedelta

# class DatabaseConnection:
#     def __init__(self):
#         self.config = Config.DB_CONFIG
#         self.connection = None

#     def connect(self):
#         """Establish database connection"""
#         try:
#             self.connection = mysql.connector.connect(**self.config)
#             if self.connection.is_connected():
#                 return self.connection
#         except Error as e:
#             print(f"Error connecting to MySQL: {e}")
#             return None

#     def disconnect(self):
#         """Close database connection"""
#         if self.connection and self.connection.is_connected():
#             self.connection.close()

#     def get_historical_data(self, product_id, days=90):
#         """
#         Fetch historical transaction data for a product
#         """
#         try:
#             connection = self.connect()
#             if not connection:
#                 return None

#             query = """
#                 SELECT
#                     DATE(st.timestamp) as transaction_date,
#                     SUM(CASE WHEN st.type = 'OUT' THEN st.quantity ELSE 0 END) as quantity_out,
#                     SUM(CASE WHEN st.type = 'IN' THEN st.quantity ELSE 0 END) as quantity_in
#                 FROM stock_transactions st
#                 WHERE st.product_id = %s
#                   AND st.timestamp >= DATE_SUB(NOW(), INTERVAL %s DAY)
#                 GROUP BY DATE(st.timestamp)
#                 ORDER BY transaction_date ASC
#             """

#             df = pd.read_sql(query, connection, params=(product_id, days))
#             self.disconnect()

#             return df

#         except Error as e:
#             print(f"Error fetching historical data: {e}")
#             self.disconnect()
#             return None

#     def get_all_products(self):
#         """Fetch all products"""
#         try:
#             connection = self.connect()
#             if not connection:
#                 return None

#             query = """
#                 SELECT
#                     id,
#                     name,
#                     sku,
#                     currentStock,
#                     reorderLevel,
#                     category,
#                     price,
#                     vendor_id
#                 FROM products
#                 ORDER BY name
#             """

#             df = pd.read_sql(query, connection)
#             self.disconnect()

#             return df

#         except Error as e:
#             print(f"Error fetching products: {e}")
#             self.disconnect()
#             return None

#     def get_product_info(self, product_id):
#         """Fetch product information"""
#         try:
#             connection = self.connect()
#             if not connection:
#                 return None

#             query = """
#                 SELECT
#                     p.id,
#                     p.name,
#                     p.sku,
#                     p.currentStock,
#                     p.reorderLevel,
#                     p.category,
#                     p.price,
#                     p.vendor_id,
#                     u.name as vendor_name,
#                     u.email as vendor_email
#                 FROM products p
#                 LEFT JOIN users u ON p.vendor_id = u.id AND u.role = 'VENDOR'
#                 WHERE p.id = %s
#             """

#             cursor = connection.cursor(dictionary=True)
#             cursor.execute(query, (product_id,))
#             result = cursor.fetchone()

#             cursor.close()
#             self.disconnect()

#             return result

#         except Error as e:
#             print(f"Error fetching product info: {e}")
#             self.disconnect()
#             return None

#     def get_vendor_for_product(self, product_id):
#         """Get vendor information for a product (from users table)"""
#         try:
#             connection = self.connect()
#             if not connection:
#                 return None

#             query = """
#                 SELECT
#                     u.id,
#                     u.name,
#                     u.email,
#                     '' as phone,
#                     '' as address
#                 FROM products p
#                 INNER JOIN users u ON p.vendor_id = u.id
#                 WHERE p.id = %s AND u.role = 'VENDOR'
#                 LIMIT 1
#             """

#             cursor = connection.cursor(dictionary=True)
#             cursor.execute(query, (product_id,))
#             result = cursor.fetchone()

#             cursor.close()
#             self.disconnect()

#             return result

#         except Error as e:
#             print(f"Error fetching vendor: {e}")
#             self.disconnect()
#             return None

#     def save_forecast(self, product_id, forecast_data):
#         """Save forecast predictions to database"""
#         try:
#             connection = self.connect()
#             if not connection:
#                 return False

#             cursor = connection.cursor()

#             # Insert or update forecast data
#             query = """
#                 INSERT INTO forecast_data
#                 (product_id, forecast_date, predicted_demand, confidence_score)
#                 VALUES (%s, %s, %s, %s)
#                 ON DUPLICATE KEY UPDATE
#                 predicted_demand = VALUES(predicted_demand),
#                 confidence_score = VALUES(confidence_score)
#             """

#             for _, row in forecast_data.iterrows():
#                 cursor.execute(query, (
#                     product_id,
#                     row['date'],
#                     int(row['predicted_demand']),
#                     float(row['confidence_score'])
#                 ))

#             connection.commit()
#             cursor.close()
#             self.disconnect()

#             return True

#         except Error as e:
#             print(f"Error saving forecast: {e}")
#             self.disconnect()
#             return False

#     def save_purchase_order(self, po_data):
#         """
#         Save purchase order to database
#         Adapted to your schema: one product per PO row
#         """
#         try:
#             connection = self.connect()
#             if not connection:
#                 return None

#             cursor = connection.cursor()

#             po_ids = []

#             # Your schema has one product per purchase_order row
#             # So we create multiple rows for multiple products
#             for item in po_data['items']:
#                 po_query = """
#                     INSERT INTO purchase_orders
#                     (product_id, vendor_id, quantity, status, expected_delivery,
#                      notes, total_cost, is_ai_generated, forecast_reference_id)
#                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
#                 """

#                 total_cost = item['quantity'] * item['unit_price']

#                 cursor.execute(po_query, (
#                     item['product_id'],
#                     po_data.get('vendor_id'),
#                     item['quantity'],
#                     po_data['status'],
#                     po_data.get('expected_delivery'),
#                     f"{po_data.get('notes', '')} - PO Group: {po_data['po_number']}",
#                     total_cost,
#                     1,  # is_ai_generated = true
#                     None  # forecast_reference_id
#                 ))

#                 po_ids.append(cursor.lastrowid)

#             connection.commit()
#             cursor.close()
#             self.disconnect()

#             # Return the first PO ID (they're grouped by po_number in notes)
#             return po_ids[0] if po_ids else None

#         except Error as e:
#             print(f"Error saving purchase order: {e}")
#             self.disconnect()
#             return None

#     def get_purchase_order(self, po_id):
#         """Get purchase order details"""
#         try:
#             connection = self.connect()
#             if not connection:
#                 return None

#             # Get PO with product and vendor details
#             query = """
#                 SELECT
#                     po.id,
#                     po.product_id,
#                     po.vendor_id,
#                     po.quantity,
#                     po.status,
#                     po.order_date as created_at,
#                     po.expected_delivery,
#                     po.actual_delivery,
#                     po.total_cost,
#                     po.notes,
#                     po.is_ai_generated,
#                     p.name as product_name,
#                     p.sku,
#                     p.price as unit_price,
#                     u.name as vendor_name,
#                     u.email as vendor_email
#                 FROM purchase_orders po
#                 INNER JOIN products p ON po.product_id = p.id
#                 LEFT JOIN users u ON po.vendor_id = u.id AND u.role = 'VENDOR'
#                 WHERE po.id = %s
#             """

#             cursor = connection.cursor(dictionary=True)
#             cursor.execute(query, (po_id,))
#             po = cursor.fetchone()

#             cursor.close()
#             self.disconnect()

#             if not po:
#                 return None

#             # Format as expected by the service
#             return {
#                 'id': po['id'],
#                 'po_number': f"PO-{po['id']:06d}",  # Generate PO number from ID
#                 'vendor_id': po['vendor_id'],
#                 'vendor_name': po['vendor_name'],
#                 'vendor_email': po['vendor_email'],
#                 'status': po['status'],
#                 'created_at': po['created_at'],
#                 'expected_delivery': po['expected_delivery'],
#                 'subtotal': float(po['total_cost']) if po['total_cost'] else 0,
#                 'tax': float(po['total_cost']) * 0.18 if po['total_cost'] else 0,
#                 'total': float(po['total_cost']) * 1.18 if po['total_cost'] else 0,
#                 'notes': po['notes'],
#                 'items': [{
#                     'id': po['id'],
#                     'product_id': po['product_id'],
#                     'product_name': po['product_name'],
#                     'sku': po['sku'],
#                     'quantity': po['quantity'],
#                     'unit_price': float(po['unit_price']) if po['unit_price'] else 0,
#                     'total_price': float(po['total_cost']) if po['total_cost'] else 0
#                 }]
#             }

#         except Error as e:
#             print(f"Error fetching purchase order: {e}")
#             self.disconnect()
#             return None

#     def get_purchase_orders_by_group(self, po_number):
#         """Get all purchase orders in a group (same po_number in notes)"""
#         try:
#             connection = self.connect()
#             if not connection:
#                 return []

#             query = """
#                 SELECT
#                     po.id,
#                     po.product_id,
#                     po.quantity,
#                     po.total_cost,
#                     p.name as product_name,
#                     p.sku,
#                     p.price as unit_price
#                 FROM purchase_orders po
#                 INNER JOIN products p ON po.product_id = p.id
#                 WHERE po.notes LIKE %s
#                 ORDER BY po.id
#             """

#             cursor = connection.cursor(dictionary=True)
#             cursor.execute(query, (f'%{po_number}%',))
#             items = cursor.fetchall()

#             cursor.close()
#             self.disconnect()

#             return [{
#                 'id': item['id'],
#                 'product_id': item['product_id'],
#                 'product_name': item['product_name'],
#                 'sku': item['sku'],
#                 'quantity': item['quantity'],
#                 'unit_price': float(item['unit_price']) if item['unit_price'] else 0,
#                 'total_price': float(item['total_cost']) if item['total_cost'] else 0
#             } for item in items]

#         except Error as e:
#             print(f"Error fetching PO group: {e}")
#             self.disconnect()
#             return []

#     def update_purchase_order_status(self, po_id, status):
#         """Update purchase order status"""
#         try:
#             connection = self.connect()
#             if not connection:
#                 return None

#             cursor = connection.cursor()

#             query = """
#                 UPDATE purchase_orders
#                 SET status = %s, updated_at = NOW()
#                 WHERE id = %s
#             """

#             cursor.execute(query, (status, po_id))
#             connection.commit()

#             cursor.close()
#             self.disconnect()

#             # Return updated PO
#             return self.get_purchase_order(po_id)

#         except Error as e:
#             print(f"Error updating purchase order: {e}")
#             self.disconnect()
#             return None

#     def create_alert(self, product_id, alert_type, message, severity='MEDIUM'):
#         """Create an alert in the alerts table"""
#         try:
#             connection = self.connect()
#             if not connection:
#                 return False

#             cursor = connection.cursor()

#             query = """
#                 INSERT INTO alerts
#                 (product_id, alert_type, message, severity)
#                 VALUES (%s, %s, %s, %s)
#             """

#             cursor.execute(query, (product_id, alert_type, message, severity))
#             connection.commit()

#             cursor.close()
#             self.disconnect()

#             return True

#         except Error as e:
#             print(f"Error creating alert: {e}")
#             self.disconnect()
#             return False








# import mysql.connector
# from mysql.connector import Error
# import pandas as pd
# from app.config import Config
# from datetime import datetime, timedelta

# class DatabaseConnection:
#     def __init__(self):
#         self.config = Config.DB_CONFIG
#         self.conn = None

#     def connect(self):
#         try:
#             self.conn = mysql.connector.connect(**self.config)
#             if self.conn.is_connected():
#                 return self.conn
#             return None
#         except Error as e:
#             print("DB connect error:", e)
#             return None

#     def disconnect(self):
#         try:
#             if self.conn and self.conn.is_connected():
#                 self.conn.close()
#         except:
#             pass

#     def get_all_products(self):
#         conn = self.connect()
#         if not conn:
#             return None
#         query = """
#             SELECT id, name, sku, currentStock, reorderLevel, category, price
#             FROM products
#             ORDER BY name
#         """
#         try:
#             df = pd.read_sql(query, conn)
#             return df
#         except Exception as e:
#             print("Error fetching products:", e)
#             return None
#         finally:
#             self.disconnect()

#     def get_product_info(self, product_id):
#         conn = self.connect()
#         if not conn:
#             return None
#         try:
#             cursor = conn.cursor(dictionary=True)
#             query = """
#                 SELECT id, name, sku, currentStock, reorderLevel, category, price
#                 FROM products
#                 WHERE id = %s
#             """
#             cursor.execute(query, (product_id,))
#             row = cursor.fetchone()
#             cursor.close()
#             return row
#         except Exception as e:
#             print("Error fetching product info:", e)
#             return None
#         finally:
#             self.disconnect()

#     def get_historical_data(self, product_id, days=90):
#         """
#         Returns a pandas DataFrame with columns: transaction_date, quantity_in, quantity_out
#         """
#         conn = self.connect()
#         if not conn:
#             return None
#         query = """
#             SELECT DATE(st.timestamp) as transaction_date,
#                    SUM(CASE WHEN st.type='IN' THEN st.quantity ELSE 0 END) as quantity_in,
#                    SUM(CASE WHEN st.type='OUT' THEN st.quantity ELSE 0 END) as quantity_out
#             FROM stock_transactions st
#             WHERE st.product_id = %s
#               AND st.timestamp >= DATE_SUB(NOW(), INTERVAL %s DAY)
#             GROUP BY DATE(st.timestamp)
#             ORDER BY transaction_date ASC
#         """
#         try:
#             df = pd.read_sql(query, conn, params=(product_id, days))
#             return df
#         except Exception as e:
#             print("Error fetching historical:", e)
#             return None
#         finally:
#             self.disconnect()




# ai-service/app/utils/database.py

import mysql.connector
from mysql.connector import Error
import pandas as pd
from app.config import Config
from datetime import datetime, timedelta

class DatabaseConnection:
    def __init__(self):
        self.config = Config.DB_CONFIG
        self.conn = None

    def connect(self):
        try:
            self.conn = mysql.connector.connect(**self.config)
            if self.conn.is_connected():
                return self.conn
            return None
        except Error as e:
            print("❌ DB connect error:", e)
            return None

    def disconnect(self):
        try:
            if self.conn and self.conn.is_connected():
                self.conn.close()
        except:
            pass

    def get_all_products(self):
        """Get all products from database"""
        conn = self.connect()
        if not conn:
            print("❌ Failed to connect to database")
            return None

        query = """
            SELECT id, name, sku, currentStock, reorderLevel, category, price, vendor_id
            FROM products
            WHERE 1=1
            ORDER BY name
        """
        try:
            df = pd.read_sql(query, conn)
            print(f"✅ Found {len(df)} products in database")
            return df
        except Exception as e:
            print("❌ Error fetching products:", e)
            import traceback
            traceback.print_exc()
            return None
        finally:
            self.disconnect()

    def get_product_info(self, product_id):
        """Get single product information"""
        conn = self.connect()
        if not conn:
            return None
        try:
            cursor = conn.cursor(dictionary=True)
            query = """
                SELECT id, name, sku, currentStock, reorderLevel, category, price, vendor_id
                FROM products
                WHERE id = %s
            """
            cursor.execute(query, (product_id,))
            row = cursor.fetchone()
            cursor.close()

            if row:
                print(f"✅ Product {product_id}: {row['name']} (Stock: {row['currentStock']}, Reorder: {row['reorderLevel']})")
            else:
                print(f"⚠️  Product {product_id} not found")

            return row
        except Exception as e:
            print(f"❌ Error fetching product {product_id}:", e)
            return None
        finally:
            self.disconnect()

    def get_historical_data(self, product_id, days=90):
        """
        Returns a pandas DataFrame with columns: transaction_date, quantity_in, quantity_out
        Aggregated by day
        """
        conn = self.connect()
        if not conn:
            print("❌ Failed to connect for historical data")
            return None

        query = """
            SELECT
                DATE(st.timestamp) as transaction_date,
                SUM(CASE WHEN st.type='IN' THEN st.quantity ELSE 0 END) as quantity_in,
                SUM(CASE WHEN st.type='OUT' THEN st.quantity ELSE 0 END) as quantity_out
            FROM stock_transactions st
            WHERE st.product_id = %s
              AND st.timestamp >= DATE_SUB(NOW(), INTERVAL %s DAY)
            GROUP BY DATE(st.timestamp)
            ORDER BY transaction_date ASC
        """
        try:
            df = pd.read_sql(query, conn, params=(product_id, days))

            if len(df) > 0:
                print(f"✅ Product {product_id}: Found {len(df)} days of transaction data")
                print(f"   Total OUT: {df['quantity_out'].sum()}, Total IN: {df['quantity_in'].sum()}")
            else:
                print(f"⚠️  Product {product_id}: No transaction history found")

            return df
        except Exception as e:
            print(f"❌ Error fetching historical data for product {product_id}:", e)
            import traceback
            traceback.print_exc()
            return None
        finally:
            self.disconnect()

    def save_forecast(self, product_id, forecast_df):
        """Save forecast results (optional - for future use)"""
        # Implementation here if you want to save forecasts to a table
        pass
