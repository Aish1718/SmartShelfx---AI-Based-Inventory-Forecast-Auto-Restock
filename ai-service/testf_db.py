# ai-service/test_db.py
from app.utils.database import DatabaseConnection
from app.config import Config

print("Testing database connection...")
print(f"Host: {Config.DB_CONFIG['host']}")
print(f"Database: {Config.DB_CONFIG['database']}")
print(f"User: {Config.DB_CONFIG['user']}")

try:
    db = DatabaseConnection()

    # Test connection
    conn = db.connect()
    if conn:
        print("✅ Database connection successful")
        db.disconnect()
    else:
        print("❌ Database connection failed")

    # Test fetching products
    products = db.get_all_products()
    if products is not None:
        print(f"✅ Found {len(products)} products")
        print(products.head())
    else:
        print("❌ Failed to fetch products")

    # Test historical data
    historical = db.get_historical_data(1, days=30)
    if historical is not None:
        print(f"✅ Found {len(historical)} days of history")
        print(historical.head())
    else:
        print("⚠️ No historical data")

except Exception as e:
    print(f"❌ Test failed: {e}")
    import traceback
    traceback.print_exc()