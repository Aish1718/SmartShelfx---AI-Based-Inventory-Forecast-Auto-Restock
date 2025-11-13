import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def prepare_time_series_data(df, target_column='quantity_out'):
    """
    Prepare time series data with proper date range and missing values
    """
    if df is None or df.empty:
        return None

    # Ensure transaction_date is datetime
    df['transaction_date'] = pd.to_datetime(df['transaction_date'])

    # Create complete date range
    date_range = pd.date_range(
        start=df['transaction_date'].min(),
        end=df['transaction_date'].max(),
        freq='D'
    )

    # Reindex with complete date range, fill missing values with 0
    df = df.set_index('transaction_date')
    df = df.reindex(date_range, fill_value=0)
    df.index.name = 'transaction_date'
    df = df.reset_index()

    return df

def create_features(df, target_column='quantity_out'):
    """
    Create time series features for forecasting
    """
    if df is None or df.empty:
        return None

    # Make a copy
    df = df.copy()

    # Time-based features
    df['day_of_week'] = df['transaction_date'].dt.dayofweek
    df['day_of_month'] = df['transaction_date'].dt.day
    df['month'] = df['transaction_date'].dt.month
    df['week_of_year'] = df['transaction_date'].dt.isocalendar().week

    # Rolling statistics (moving averages)
    df['rolling_mean_7'] = df[target_column].rolling(window=7, min_periods=1).mean()
    df['rolling_mean_14'] = df[target_column].rolling(window=14, min_periods=1).mean()
    df['rolling_mean_30'] = df[target_column].rolling(window=30, min_periods=1).mean()

    # Rolling standard deviation
    df['rolling_std_7'] = df[target_column].rolling(window=7, min_periods=1).std()
    df['rolling_std_14'] = df[target_column].rolling(window=14, min_periods=1).std()

    # Lag features (previous days)
    df['lag_1'] = df[target_column].shift(1)
    df['lag_7'] = df[target_column].shift(7)
    df['lag_14'] = df[target_column].shift(14)
    df['lag_30'] = df[target_column].shift(30)

    # Fill NaN values
    df = df.fillna(0)

    return df

def calculate_confidence_score(predictions, historical_data):
    """
    Calculate confidence score for predictions based on historical variance
    """
    if len(historical_data) < 7:
        return 0.5

    # Calculate coefficient of variation
    mean = historical_data.mean()
    std = historical_data.std()

    if mean == 0:
        return 0.5

    cv = std / mean

    # Convert to confidence score (0-1)
    # Lower CV = higher confidence
    confidence = max(0.3, min(1.0, 1.0 - (cv / 2)))

    return round(confidence, 2)

def detect_stockout_risk(current_stock, reorder_level, predicted_demand_7days):
    """
    Detect if product is at risk of stockout
    """
    days_until_stockout = None
    risk_level = 'LOW'

    if predicted_demand_7days > 0:
        days_until_stockout = int(current_stock / (predicted_demand_7days / 7))

        if days_until_stockout <= 3:
            risk_level = 'CRITICAL'
        elif days_until_stockout <= 7:
            risk_level = 'HIGH'
        elif days_until_stockout <= 14:
            risk_level = 'MEDIUM'

    at_risk = current_stock < reorder_level or days_until_stockout and days_until_stockout <= 14

    return {
        'at_risk': at_risk,
        'risk_level': risk_level,
        'days_until_stockout': days_until_stockout,
        'recommended_order_quantity': max(0, reorder_level - current_stock + int(predicted_demand_7days))
    }