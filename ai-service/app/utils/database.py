import mysql.connector
from mysql.connector import Error
from app.config import Config
import pandas as pd
from datetime import datetime, timedelta

class DatabaseConnection:
    def __init__(self):
        self.config = Config.DB_CONFIG
        self.connection = None

    def connect(self):
        """Establish database connection"""
        try:
            self.connection = mysql.connector.connect(**self.config)
            if self.connection.is_connected():
                return self.connection
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            return None

    def disconnect(self):
        """Close database connection"""
        if self.connection and self.connection.is_connected():
            self.connection.close()

    def get_historical_data(self, product_id, days=90):
        """
        Fetch historical transaction data for a product
        """
        try:
            connection = self.connect()
            if not connection:
                return None

            query = """
                SELECT
                    DATE(st.timestamp) as transaction_date,
                    SUM(CASE WHEN st.type = 'OUT' THEN st.quantity ELSE 0 END) as quantity_out,
                    SUM(CASE WHEN st.type = 'IN' THEN st.quantity ELSE 0 END) as quantity_in
                FROM stock_transactions st
                WHERE st.product_id = %s
                  AND st.timestamp >= DATE_SUB(NOW(), INTERVAL %s DAY)
                GROUP BY DATE(st.timestamp)
                ORDER BY transaction_date ASC
            """

            df = pd.read_sql(query, connection, params=(product_id, days))
            self.disconnect()

            return df

        except Error as e:
            print(f"Error fetching historical data: {e}")
            self.disconnect()
            return None

    def get_all_products(self):
        """Fetch all products"""
        try:
            connection = self.connect()
            if not connection:
                return None

            query = """
                SELECT
                    id,
                    name,
                    sku,
                    current_stock,
                    reorder_level,
                    category
                FROM products
                ORDER BY name
            """

            df = pd.read_sql(query, connection)
            self.disconnect()

            return df

        except Error as e:
            print(f"Error fetching products: {e}")
            self.disconnect()
            return None

    def get_product_info(self, product_id):
        """Fetch product information"""
        try:
            connection = self.connect()
            if not connection:
                return None

            query = """
                SELECT
                    id,
                    name,
                    sku,
                    current_stock,
                    reorder_level,
                    category,
                    price
                FROM products
                WHERE id = %s
            """

            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, (product_id,))
            result = cursor.fetchone()

            cursor.close()
            self.disconnect()

            return result

        except Error as e:
            print(f"Error fetching product info: {e}")
            self.disconnect()
            return None

    def save_forecast(self, product_id, forecast_data):
        """Save forecast predictions to database"""
        try:
            connection = self.connect()
            if not connection:
                return False

            cursor = connection.cursor()

            # Insert or update forecast data
            query = """
                INSERT INTO forecast_data
                (product_id, forecast_date, predicted_demand, confidence_score)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                predicted_demand = VALUES(predicted_demand),
                confidence_score = VALUES(confidence_score)
            """

            for _, row in forecast_data.iterrows():
                cursor.execute(query, (
                    product_id,
                    row['date'],
                    int(row['predicted_demand']),
                    float(row['confidence_score'])
                ))

            connection.commit()
            cursor.close()
            self.disconnect()

            return True

        except Error as e:
            print(f"Error saving forecast: {e}")
            self.disconnect()
            return False