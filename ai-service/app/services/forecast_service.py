import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from app.models.forecast_model import DemandForecastModel
from app.utils.database import DatabaseConnection
from app.utils.helpers import (
    prepare_time_series_data,
    create_features,
    calculate_confidence_score,
    detect_stockout_risk
)
from app.config import Config

class ForecastService:
    def __init__(self):
        self.db = DatabaseConnection()
        self.model = DemandForecastModel()

    def generate_forecast(self, product_id, forecast_days=None):
        """
        Generate demand forecast for a product

        Args:
            product_id: Product ID
            forecast_days: Number of days to forecast (default from config)

        Returns:
            Dictionary with forecast data and metrics
        """
        if forecast_days is None:
            forecast_days = Config.FORECAST_DAYS

        try:
            # Get product information
            product_info = self.db.get_product_info(product_id)
            if not product_info:
                return {'error': 'Product not found'}

            # Get historical data
            historical_df = self.db.get_historical_data(product_id, days=90)

            if historical_df is None or len(historical_df) < Config.MIN_HISTORICAL_DAYS:
                return {
                    'error': f'Insufficient historical data. Need at least {Config.MIN_HISTORICAL_DAYS} days.',
                    'available_days': len(historical_df) if historical_df is not None else 0
                }

            # Prepare data
            df = prepare_time_series_data(historical_df)
            df = create_features(df)

            # Train model on historical data
            feature_cols = [col for col in Config.FEATURES if col in df.columns]
            X = df[feature_cols]
            y = df['quantity_out']

            # Train model
            self.model.train(X, y, model_type='random_forest')

            # Generate future dates
            last_date = df['transaction_date'].max()
            future_dates = pd.date_range(
                start=last_date + timedelta(days=1),
                periods=forecast_days,
                freq='D'
            )

            # Create future dataframe
            future_df = pd.DataFrame({'transaction_date': future_dates})
            future_df['quantity_out'] = 0  # Placeholder

            # Combine with historical data for feature creation
            combined_df = pd.concat([df, future_df], ignore_index=True)
            combined_df = create_features(combined_df)

            # Extract future features
            future_features = combined_df.iloc[-forecast_days:][feature_cols]

            # Make predictions
            predictions = self.model.predict(future_features)

            # Calculate confidence score
            confidence = calculate_confidence_score(
                predictions,
                df['quantity_out'].tail(30)
            )

            # Create forecast dataframe
            forecast_df = pd.DataFrame({
                'date': future_dates,
                'predicted_demand': predictions.round().astype(int),
                'confidence_score': confidence
            })

            # Calculate aggregated predictions
            predicted_demand_7days = int(forecast_df['predicted_demand'].head(7).sum())
            predicted_demand_14days = int(forecast_df['predicted_demand'].head(14).sum())
            predicted_demand_30days = int(forecast_df['predicted_demand'].sum())

            # Detect stockout risk
            risk_analysis = detect_stockout_risk(
                current_stock=product_info['current_stock'],
                reorder_level=product_info['reorder_level'],
                predicted_demand_7days=predicted_demand_7days
            )

            # Save forecast to database
            self.db.save_forecast(product_id, forecast_df)

            # Prepare response
            result = {
                'product_id': product_id,
                'product_name': product_info['name'],
                'product_sku': product_info['sku'],
                'current_stock': product_info['current_stock'],
                'reorder_level': product_info['reorder_level'],
                'forecast_generated_at': datetime.now().isoformat(),
                'historical_days': len(historical_df),
                'forecast_days': forecast_days,
                'confidence_score': confidence,
                'predictions': {
                    'next_7_days': predicted_demand_7days,
                    'next_14_days': predicted_demand_14days,
                    'next_30_days': predicted_demand_30days,
                    'daily_forecast': forecast_df.to_dict('records')
                },
                'risk_analysis': risk_analysis,
                'historical_summary': {
                    'avg_daily_demand': float(df['quantity_out'].mean().round(2)),
                    'max_daily_demand': int(df['quantity_out'].max()),
                    'min_daily_demand': int(df['quantity_out'].min()),
                    'total_demand_90days': int(df['quantity_out'].sum())
                }
            }

            return result

        except Exception as e:
            return {'error': str(e)}

    def generate_bulk_forecast(self, product_ids=None):
        """
        Generate forecasts for multiple products

        Args:
            product_ids: List of product IDs (None for all products)

        Returns:
            List of forecast results
        """
        if product_ids is None:
            # Get all products
            products_df = self.db.get_all_products()
            if products_df is None:
                return {'error': 'Failed to fetch products'}
            product_ids = products_df['id'].tolist()

        results = []

        for product_id in product_ids:
            forecast = self.generate_forecast(product_id, forecast_days=30)

            # Only include successful forecasts
            if 'error' not in forecast:
                results.append({
                    'product_id': product_id,
                    'product_name': forecast['product_name'],
                    'product_sku': forecast['product_sku'],
                    'current_stock': forecast['current_stock'],
                    'predicted_demand_7days': forecast['predictions']['next_7_days'],
                    'risk_level': forecast['risk_analysis']['risk_level'],
                    'at_risk': forecast['risk_analysis']['at_risk'],
                    'confidence_score': forecast['confidence_score']
                })

        return results

    def get_products_at_risk(self):
        """
        Get list of products at risk of stockout
        """
        forecasts = self.generate_bulk_forecast()

        if isinstance(forecasts, dict) and 'error' in forecasts:
            return forecasts

        at_risk_products = [
            f for f in forecasts
            if f.get('at_risk', False)
        ]

        # Sort by risk level
        risk_order = {'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3}
        at_risk_products.sort(key=lambda x: risk_order.get(x['risk_level'], 4))

        return at_risk_products