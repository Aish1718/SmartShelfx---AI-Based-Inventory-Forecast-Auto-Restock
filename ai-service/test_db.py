# import mysql.connector

# def test_connection():
#     try:
#         conn = mysql.connector.connect(
#             host="localhost",
#             user="root",
#             password="snowmoon$",
#             database="smartshelfx"
#         )

#         print("CONNECTED:", conn.is_connected())

#         cur = conn.cursor()
#         cur.execute("SELECT id, name FROM products")
#         rows = cur.fetchall()

#         print("PRODUCTS:", rows)

#         conn.close()

#     except Exception as e:
#         print("ERROR:", e)

# if __name__ == "__main__":
#     test_connection()




import mysql.connector
from mysql.connector import Error

print("🔍 Testing MySQL connection...")

try:
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="snowmoon$",   # <-- change this if your password is different
        database="smartshelfx",
        port=3306
    )

    print("✅ CONNECTED:", conn.is_connected())

    cursor = conn.cursor()
    cursor.execute("SELECT id, name FROM products")
    print("📦 PRODUCTS:", cursor.fetchall())

except Error as e:
    print("❌ MySQL ERROR:", e)

finally:
    try:
        conn.close()
    except:
        pass
