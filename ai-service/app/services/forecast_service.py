# # ai-service/app/services/forecast_service.py
# import pandas as pd
# import numpy as np
# from datetime import datetime, timedelta
# from app.models.forecast_model import DemandForecastModel
# from app.utils.database import DatabaseConnection
# from app.utils.helpers import (
#     prepare_time_series_data,
#     create_features,
#     calculate_confidence_score,
#     detect_stockout_risk
# )
# from app.config import Config

# class ForecastService:
#     def __init__(self):
#         self.db = DatabaseConnection()
#         self.model = DemandForecastModel()

#     def generate_forecast(self, product_id, forecast_days=None):
#         """
#         Generate demand forecast for a product

#         Args:
#             product_id: Product ID
#             forecast_days: Number of days to forecast (default from config)

#         Returns:
#             Dictionary with forecast data and metrics
#         """
#         if forecast_days is None:
#             forecast_days = Config.FORECAST_DAYS

#         try:
#             # Get product information
#             product_info = self.db.get_product_info(product_id)
#             if not product_info:
#                 return {'error': 'Product not found'}

#             # Get historical data
#             historical_df = self.db.get_historical_data(product_id, days=90)

#             if historical_df is None or len(historical_df) < Config.MIN_HISTORICAL_DAYS:
#                 return {
#                     'error': f'Insufficient historical data. Need at least {Config.MIN_HISTORICAL_DAYS} days.',
#                     'available_days': len(historical_df) if historical_df is not None else 0
#                 }

#             # Prepare data
#             df = prepare_time_series_data(historical_df)
#             df = create_features(df)

#             # Train model on historical data
#             feature_cols = [col for col in Config.FEATURES if col in df.columns]
#             X = df[feature_cols]
#             y = df['quantity_out']

#             # Train model
#             self.model.train(X, y, model_type='random_forest')

#             # Generate future dates
#             last_date = df['transaction_date'].max()
#             future_dates = pd.date_range(
#                 start=last_date + timedelta(days=1),
#                 periods=forecast_days,
#                 freq='D'
#             )

#             # Create future dataframe
#             future_df = pd.DataFrame({'transaction_date': future_dates})
#             future_df['quantity_out'] = 0  # Placeholder

#             # Combine with historical data for feature creation
#             combined_df = pd.concat([df, future_df], ignore_index=True)
#             combined_df = create_features(combined_df)

#             # Extract future features
#             future_features = combined_df.iloc[-forecast_days:][feature_cols]

#             # Make predictions
#             predictions = self.model.predict(future_features)

#             # Calculate confidence score
#             confidence = calculate_confidence_score(
#                 predictions,
#                 df['quantity_out'].tail(30)
#             )

#             # Create forecast dataframe
#             forecast_df = pd.DataFrame({
#                 'date': future_dates,
#                 'predicted_demand': predictions.round().astype(int),
#                 'confidence_score': confidence
#             })

#             # Calculate aggregated predictions
#             predicted_demand_7days = int(forecast_df['predicted_demand'].head(7).sum())
#             predicted_demand_14days = int(forecast_df['predicted_demand'].head(14).sum())
#             predicted_demand_30days = int(forecast_df['predicted_demand'].sum())

#             # Detect stockout risk
#             risk_analysis = detect_stockout_risk(
#                 current_stock=product_info['currentStock'],
#                 reorder_level=product_info['reorderLevel'],
#                 predicted_demand_7days=predicted_demand_7days
#             )

#             # Save forecast to database
#             self.db.save_forecast(product_id, forecast_df)

#             # Prepare response
#             result = {
#                 'product_id': product_id,
#                 'product_name': product_info['name'],
#                 'product_sku': product_info['sku'],
#                 'currentStock': product_info['currentStock'],
#                 'reorderLevel': product_info['reorderLevel'],
#                 'forecast_generated_at': datetime.now().isoformat(),
#                 'historical_days': len(historical_df),
#                 'forecast_days': forecast_days,
#                 'confidence_score': confidence,
#                 'predictions': {
#                     'next_7_days': predicted_demand_7days,
#                     'next_14_days': predicted_demand_14days,
#                     'next_30_days': predicted_demand_30days,
#                     'daily_forecast': forecast_df.to_dict('records')
#                 },
#                 'risk_analysis': risk_analysis,
#                 'historical_summary': {
#                     'avg_daily_demand': float(df['quantity_out'].mean().round(2)),
#                     'max_daily_demand': int(df['quantity_out'].max()),
#                     'min_daily_demand': int(df['quantity_out'].min()),
#                     'total_demand_90days': int(df['quantity_out'].sum())
#                 }
#             }

#             return result

#         except Exception as e:
#             return {'error': str(e)}

#     def generate_bulk_forecast(self, product_ids=None):
#         """
#         Generate forecasts for multiple products

#         Args:
#             product_ids: List of product IDs (None for all products)

#         Returns:
#             List of forecast results
#         """
#         if product_ids is None:
#             # Get all products
#             products_df = self.db.get_all_products()
#             if products_df is None:
#                 return {'error': 'Failed to fetch products'}
#             product_ids = products_df['id'].tolist()

#         results = []

#         for product_id in product_ids:
#             forecast = self.generate_forecast(product_id, forecast_days=30)

#             # Only include successful forecasts
#             if 'error' not in forecast:
#                 results.append({
#                     'product_id': product_id,
#                     'product_name': forecast['product_name'],
#                     'product_sku': forecast['product_sku'],
#                     'currentStock': forecast['currentStock'],
#                     'predicted_demand_7days': forecast['predictions']['next_7_days'],
#                     'risk_level': forecast['risk_analysis']['risk_level'],
#                     'at_risk': forecast['risk_analysis']['at_risk'],
#                     'confidence_score': forecast['confidence_score']
#                 })

#         return results

#     def get_products_at_risk(self):
#         """
#         Get list of products at risk of stockout
#         """
#         forecasts = self.generate_bulk_forecast()

#         if isinstance(forecasts, dict) and 'error' in forecasts:
#             return forecasts

#         at_risk_products = [
#             f for f in forecasts
#             if f.get('at_risk', False)
#         ]

#         # Sort by risk level
#         risk_order = {'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3}
#         at_risk_products.sort(key=lambda x: risk_order.get(x['risk_level'], 4))

#         return at_risk_products




# import pandas as pd
# import numpy as np
# from datetime import datetime, timedelta
# from app.models.forecast_model import DemandForecastModel
# from app.utils.database import DatabaseConnection
# from app.utils.helpers import (
#     prepare_time_series_data,
#     create_features,
#     calculate_confidence_score,
#     detect_stockout_risk
# )
# from app.config import Config

# class ForecastService:
#     def __init__(self):
#         self.db = DatabaseConnection()
#         self.model = DemandForecastModel()



# # ai-service/app/services/forecast_service.py

# import pandas as pd
# import numpy as np
# from datetime import datetime, timedelta

# from app.models.forecast_model import DemandForecastModel
# from app.utils.database import DatabaseConnection
# from app.utils.helpers import (
#     prepare_time_series_data,
#     create_features,
#     calculate_confidence_score,
#     detect_stockout_risk
# )
# from app.config import Config


# class ForecastService:
#     def __init__(self):
#         self.db = DatabaseConnection()
#         self.model = DemandForecastModel()

#     # ------------------------------------------------
#     # Generate forecast for a single product
#     # ------------------------------------------------
#     def generate_forecast(self, product_id, forecast_days=None):

#         if forecast_days is None:
#             forecast_days = Config.FORECAST_DAYS

#         try:
#             # Fetch product info
#             product_info = self.db.get_product_info(product_id)
#             if not product_info:
#                 return {"error": "Product not found"}

#             # Fetch 90 days historical stock transactions
#             historical_df = self.db.get_historical_data(product_id, days=90)

#             if historical_df is None or len(historical_df) < Config.MIN_HISTORICAL_DAYS:
#                 return {
#                     "error": f"Insufficient historical data (need {Config.MIN_HISTORICAL_DAYS}+ days)",
#                     "available_days": len(historical_df) if historical_df is not None else 0
#                 }

#             # Prepare ML-ready time-series data
#             df = prepare_time_series_data(historical_df)
#             df = create_features(df)

#             feature_cols = [col for col in Config.FEATURES if col in df.columns]
#             X = df[feature_cols]
#             y = df["quantity_out"]

#             # Train RandomForest
#             self.model.train(X, y, model_type="random_forest")

#             # Create future prediction range
#             last_date = df["transaction_date"].max()
#             future_dates = pd.date_range(
#                 start=last_date + timedelta(days=1),
#                 periods=forecast_days,
#                 freq="D"
#             )

#             future_df = pd.DataFrame({"transaction_date": future_dates})
#             future_df["quantity_out"] = 0

#             combined = pd.concat([df, future_df], ignore_index=True)
#             combined = create_features(combined)

#             future_features = combined.iloc[-forecast_days:][feature_cols]

#             predictions = self.model.predict(future_features)

#             # Confidence score
#             confidence = calculate_confidence_score(predictions, df["quantity_out"].tail(30))

#             # Final result dataframe
#             forecast_df = pd.DataFrame({
#                 "date": future_dates,
#                 "predicted_demand": predictions.round().astype(int),
#                 "confidence_score": confidence
#             })

#             # Aggregate predictions
#             predicted_7 = int(forecast_df["predicted_demand"].head(7).sum())
#             predicted_14 = int(forecast_df["predicted_demand"].head(14).sum())
#             predicted_30 = int(forecast_df["predicted_demand"].sum())

#             # Stockout risk analysis
#             risk_analysis = detect_stockout_risk(
#                 currentStock=product_info["currentStock"],
#                 reorderLevel=product_info["reorderLevel"],
#                 predicted_demand_7days=predicted_7
#             )

#             # Save the forecast into DB
#             self.db.save_forecast(product_id, forecast_df)

#             return {
#                 "product_id": product_id,
#                 "product_name": product_info["name"],
#                 "product_sku": product_info["sku"],
#                 "currentStock": product_info["currentStock"],
#                 "reorderLevel": product_info["reorderLevel"],
#                 "forecast_generated_at": datetime.now().isoformat(),

#                 "historical_days": len(historical_df),
#                 "forecast_days": forecast_days,
#                 "confidence_score": confidence,

#                 "predictions": {
#                     "next_7_days": predicted_7,
#                     "next_14_days": predicted_14,
#                     "next_30_days": predicted_30,
#                     "daily_forecast": forecast_df.to_dict("records")
#                 },

#                 "risk_analysis": risk_analysis,

#                 "historical_summary": {
#                     "avg_daily_demand": float(df["quantity_out"].mean().round(2)),
#                     "max_daily_demand": int(df["quantity_out"].max()),
#                     "min_daily_demand": int(df["quantity_out"].min()),
#                     "total_demand_90days": int(df["quantity_out"].sum())
#                 }
#             }

#         except Exception as e:
#             return {"error": str(e)}

#     # ------------------------------------------------
#     # Generate forecasts for all products
#     # ------------------------------------------------
#     def generate_bulk_forecast(self, product_ids=None):

#         try:
#             if product_ids is None:
#                 all_products = self.db.get_all_products()
#                 if all_products is None:
#                     return {"error": "Failed to fetch products"}
#                 product_ids = all_products["id"].tolist()

#             results = []

#             for pid in product_ids:
#                 forecast = self.generate_forecast(pid, forecast_days=30)

#                 if "error" not in forecast:
#                     results.append({
#                         "product_id": pid,
#                         "product_name": forecast["product_name"],
#                         "product_sku": forecast["product_sku"],
#                         "currentStock": forecast["currentStock"],
#                         "predicted_demand_7days": forecast["predictions"]["next_7_days"],
#                         "risk_level": forecast["risk_analysis"]["risk_level"],
#                         "at_risk": forecast["risk_analysis"]["at_risk"],
#                         "confidence_score": forecast["confidence_score"]
#                     })

#             return results

#         except Exception as e:
#             return {"error": str(e)}

#     # ------------------------------------------------
#     # Products at risk of stockout
#     # ------------------------------------------------
#     def get_products_at_risk(self):

#         forecasts = self.generate_bulk_forecast()

#         if isinstance(forecasts, dict) and "error" in forecasts:
#             return forecasts

#         at_risk = [f for f in forecasts if f.get("at_risk", False)]

#         # Sort by severity
#         risk_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
#         at_risk.sort(key=lambda x: risk_order.get(x["risk_level"], 4))

#         return at_risk






# ai-service/app/services/forecast_service.py

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import sys

from app.models.forecast_model import DemandForecastModel
from app.utils.database import DatabaseConnection
from app.utils.helpers import (
    prepare_time_series_data,
    create_features,
    calculate_confidence_score,
    detect_stockout_risk
)
from app.config import Config

# Default features if not in config
DEFAULT_FEATURES = [
    "day_of_week", "day_of_month", "month",
    "rolling_mean_7", "rolling_mean_14", "rolling_std_7",
    "lag_1", "lag_7", "lag_14"
]


class ForecastService:
    # def __init__(self):
    #     self.db = DatabaseConnection()
    #     self.model = DemandForecastModel()


    # In the __init__ method
    def __init__(self):
        try:
            self.db = DatabaseConnection()
            self.model = DemandForecastModel()
            print("✅ ForecastService initialized successfully")
        except Exception as e:
            print(f"❌ Failed to initialize ForecastService: {e}")
            import traceback
            traceback.print_exc()



    def generate_forecast(self, product_id, forecast_days=None):
        if forecast_days is None:
            forecast_days = Config.DEFAULT_FORECAST_DAYS

        try:
            # Fetch product info
            product_info = self.db.get_product_info(product_id)
            if not product_info:
                print(f"❌ Product {product_id} not found")
                return {"error": "Product not found"}

            print(f"✅ Product {product_id}: {product_info['name']}")
            print(f"   Current Stock: {product_info['currentStock']}, Reorder Level: {product_info['reorderLevel']}")

            # Fetch historical data
            historical_df = self.db.get_historical_data(product_id, days=90)

            if historical_df is None or len(historical_df) < 7:  # Reduced from Config.MIN_HISTORICAL_DAYS
                print(f"⚠️  Insufficient data for product {product_id}: {len(historical_df) if historical_df is not None else 0} days")

                # FALLBACK: Use simple average-based prediction
                if historical_df is not None and len(historical_df) > 0:
                    avg_demand = historical_df["quantity_out"].mean()
                    predicted_7 = int(avg_demand * 7)
                    predicted_14 = int(avg_demand * 14)
                    predicted_30 = int(avg_demand * 30)
                    confidence = 0.5
                else:
                    # No data at all - use reorder level as estimate
                    predicted_7 = int(product_info['reorderLevel'] * 0.3)
                    predicted_14 = int(product_info['reorderLevel'] * 0.6)
                    predicted_30 = product_info['reorderLevel']
                    confidence = 0.3

                risk_analysis = detect_stockout_risk(
                    currentStock=product_info["currentStock"],
                    reorderLevel=product_info["reorderLevel"],
                    predicted_demand_7days=predicted_7
                )

                print(f"   Using fallback prediction: 7d={predicted_7}, Risk={risk_analysis['risk_level']}")

                # ⭐ ADD this for Historical Summary in fallback mode
                historical_summary = {
                    "avg_daily_demand": float(historical_df["quantity_out"].mean()) if historical_df is not None and len(historical_df) > 0 else 0,
                    "max_daily_demand": int(historical_df["quantity_out"].max()) if historical_df is not None and len(historical_df) > 0 else 0,
                    "min_daily_demand": int(historical_df["quantity_out"].min()) if historical_df is not None and len(historical_df) > 0 else 0,
                    "total_demand_90days": int(historical_df["quantity_out"].sum()) if historical_df is not None and len(historical_df) > 0 else 0
                }


                return {
                    "product_id": product_id,
                    "product_name": product_info["name"],
                    "product_sku": product_info["sku"],
                    "currentStock": product_info["currentStock"],
                    "reorderLevel": product_info["reorderLevel"],
                    "forecast_generated_at": datetime.now().isoformat(),
                    "historical_days": len(historical_df) if historical_df is not None else 0,
                    "forecast_days": forecast_days,
                    "confidence_score": confidence,
                    "predictions": {
                        "next_7_days": predicted_7,
                        "next_14_days": predicted_14,
                        "next_30_days": predicted_30,
                    },
                    "historical_summary": historical_summary,   # ⭐ Added
                    "risk_analysis": risk_analysis,
                    "method": "fallback"
                }

            # ML-based prediction
            df = prepare_time_series_data(historical_df)
            df = create_features(df)

            feature_cols = DEFAULT_FEATURES if not hasattr(Config, 'FEATURES') else [
                col for col in Config.FEATURES if col in df.columns
            ]
            X = df[feature_cols]
            y = df["quantity_out"]

            self.model.train(X, y, model_type="random_forest")

            last_date = df["transaction_date"].max()
            future_dates = pd.date_range(
                start=last_date + timedelta(days=1),
                periods=forecast_days,
                freq="D"
            )

            future_df = pd.DataFrame({"transaction_date": future_dates})
            future_df["quantity_out"] = 0

            combined = pd.concat([df, future_df], ignore_index=True)
            combined = create_features(combined)

            future_features = combined.iloc[-forecast_days:][feature_cols]
            predictions = self.model.predict(future_features)
            confidence = calculate_confidence_score(predictions, df["quantity_out"].tail(30))

            forecast_df = pd.DataFrame({
                "date": future_dates,
                "predicted_demand": predictions.round().astype(int),
                "confidence_score": confidence
            })

            predicted_7 = int(forecast_df["predicted_demand"].head(7).sum())
            predicted_14 = int(forecast_df["predicted_demand"].head(14).sum())
            predicted_30 = int(forecast_df["predicted_demand"].sum())

            risk_analysis = detect_stockout_risk(
                currentStock=product_info["currentStock"],
                reorderLevel=product_info["reorderLevel"],
                predicted_demand_7days=predicted_7
            )

            print(f"   ML Prediction: 7d={predicted_7}, Risk={risk_analysis['risk_level']}")

            self.db.save_forecast(product_id, forecast_df)

            return {
                "product_id": product_id,
                "product_name": product_info["name"],
                "product_sku": product_info["sku"],
                "currentStock": product_info["currentStock"],
                "reorderLevel": product_info["reorderLevel"],
                "forecast_generated_at": datetime.now().isoformat(),
                "historical_days": len(historical_df),
                "forecast_days": forecast_days,
                "confidence_score": confidence,
                "predictions": {
                    "next_7_days": predicted_7,
                    "next_14_days": predicted_14,
                    "next_30_days": predicted_30,
                    "daily_forecast": forecast_df.to_dict("records")
                },
                "risk_analysis": risk_analysis,
                "historical_summary": {
                    "avg_daily_demand": float(df["quantity_out"].mean().round(2)),
                    "max_daily_demand": int(df["quantity_out"].max()),
                    "min_daily_demand": int(df["quantity_out"].min()),
                    "total_demand_90days": int(df["quantity_out"].sum())
                },
                "method": "ml"
            }

        except Exception as e:
            print(f"❌ Error forecasting product {product_id}: {str(e)}")
            import traceback
            traceback.print_exc()
            return {"error": str(e)}

    def generate_bulk_forecast(self, product_ids=None):
        try:
            if product_ids is None:
                all_products = self.db.get_all_products()
                if all_products is None or len(all_products) == 0:
                    print("❌ No products found in database")
                    return {"error": "Failed to fetch products"}
                product_ids = all_products["id"].tolist()

            print(f"\n🔍 Generating bulk forecast for {len(product_ids)} products...")
            results = []

            for pid in product_ids:
                forecast = self.generate_forecast(pid, forecast_days=30)

                if "error" not in forecast:
                    results.append({
                        "product_id": pid,
                        "product_name": forecast["product_name"],
                        "product_sku": forecast["product_sku"],
                        "currentStock": forecast["currentStock"],
                        "predicted_demand_7days": forecast["predictions"]["next_7_days"],
                        "risk_level": forecast["risk_analysis"]["risk_level"],
                        "at_risk": forecast["risk_analysis"]["at_risk"],
                        "confidence_score": forecast["confidence_score"]
                    })

            print(f"✅ Generated {len(results)} forecasts")
            return results

        except Exception as e:
            print(f"❌ Bulk forecast error: {str(e)}")
            import traceback
            traceback.print_exc()
            return {"error": str(e)}

    def get_products_at_risk(self):
        print("\n🚨 Checking products at risk...")

        forecasts = self.generate_bulk_forecast()

        if isinstance(forecasts, dict) and "error" in forecasts:
            return forecasts

        at_risk = [f for f in forecasts if f.get("at_risk", False)]

        print(f"📊 Total products analyzed: {len(forecasts)}")
        print(f"⚠️  Products at risk: {len(at_risk)}")

        for product in at_risk:
            print(f"   - {product['product_name']}: {product['risk_level']} (Stock: {product['currentStock']}, Predicted: {product['predicted_demand_7days']})")

        # Sort by severity
        risk_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
        at_risk.sort(key=lambda x: risk_order.get(x["risk_level"], 4))

        return at_risk