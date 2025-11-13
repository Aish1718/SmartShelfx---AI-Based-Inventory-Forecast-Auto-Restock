import os

class Config:
    # Flask Configuration
    DEBUG = True
    HOST = '0.0.0.0'
    PORT = 5000

    # MySQL Database Configuration
    DB_CONFIG = {
        'host': os.getenv('DB_HOST', 'localhost'),
        'port': int(os.getenv('DB_PORT', 3306)),
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', 'root'),
        'database': os.getenv('DB_NAME', 'smartshelfx')
    }

    # Model Configuration
    MODEL_DIR = 'models'
    MODEL_NAME = 'demand_forecast_model.pkl'

    # Forecast Configuration
    FORECAST_DAYS = 30
    MIN_HISTORICAL_DAYS = 30
    CONFIDENCE_THRESHOLD = 0.7

    # Feature Configuration
    FEATURES = [
        'day_of_week',
        'day_of_month',
        'month',
        'rolling_mean_7',
        'rolling_mean_14',
        'rolling_std_7',
        'lag_1',
        'lag_7',
        'lag_14'
    ]