# # ai-service/app/services/restock_service.py
# import pandas as pd
# from datetime import datetime, timedelta
# from app.utils.database import DatabaseConnection
# from app.services.forecast_service import ForecastService

# class RestockService:
#     def __init__(self):
#         self.db = DatabaseConnection()
#         self.forecast_service = ForecastService()

#     def generate_restock_recommendations(self, product_ids=None):
#         """
#         Generate restock recommendations based on forecasts

#         Returns list of products that need restocking with quantities
#         """
#         # Get forecasts for all products
#         forecasts = self.forecast_service.generate_bulk_forecast(product_ids)

#         if isinstance(forecasts, dict) and 'error' in forecasts:
#             return forecasts

#         recommendations = []

#         for forecast in forecasts:
#             # Only recommend restocking for at-risk products
#             if forecast.get('at_risk', False):
#                 recommendation = self._create_recommendation(forecast)
#                 if recommendation:
#                     recommendations.append(recommendation)

#         # Sort by priority (CRITICAL first)
#         priority_order = {'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3}
#         recommendations.sort(
#             key=lambda x: priority_order.get(x['priority'], 4)
#         )

#         return recommendations

#     def _create_recommendation(self, forecast):
#         """Create a restock recommendation from forecast data"""
#         product_id = forecast['product_id']
#         current_stock = forecast['currentStock']
#         predicted_demand = forecast['predicted_demand_7days']
#         risk_level = forecast['risk_level']

#         # Calculate recommended order quantity
#         # Formula: (Predicted demand for 2 weeks) + Safety stock - Current stock
#         safety_stock = int(predicted_demand * 0.5)  # 50% buffer
#         two_week_demand = predicted_demand * 2
#         recommended_quantity = max(
#             0,
#             int(two_week_demand + safety_stock - current_stock)
#         )

#         # Get vendor info
#         vendor_info = self.db.get_vendor_for_product(product_id)

#         return {
#             'product_id': product_id,
#             'product_name': forecast['product_name'],
#             'sku': forecast['product_sku'],
#             'current_stock': current_stock,
#             'predicted_demand_7days': predicted_demand,
#             'predicted_demand_14days': predicted_demand * 2,
#             'recommended_quantity': recommended_quantity,
#             'priority': risk_level,
#             'estimated_stockout_days': forecast.get('days_until_stockout'),
#             'vendor': vendor_info,
#             'estimated_cost': self._calculate_cost(product_id, recommended_quantity),
#             'confidence_score': forecast['confidence_score']
#         }

#     def _calculate_cost(self, product_id, quantity):
#         """Calculate estimated cost for purchase order"""
#         product_info = self.db.get_product_info(product_id)
#         if product_info and 'price' in product_info:
#             return round(product_info['price'] * quantity, 2)
#         return 0

#     def get_restock_summary(self):
#         """Get summary statistics for restocking needs"""
#         recommendations = self.generate_restock_recommendations()

#         if isinstance(recommendations, dict) and 'error' in recommendations:
#             return recommendations

#         summary = {
#             'total_products_need_restock': len(recommendations),
#             'critical_priority': len([r for r in recommendations if r['priority'] == 'CRITICAL']),
#             'high_priority': len([r for r in recommendations if r['priority'] == 'HIGH']),
#             'medium_priority': len([r for r in recommendations if r['priority'] == 'MEDIUM']),
#             'total_estimated_cost': sum(r['estimated_cost'] for r in recommendations),
#             'total_units_to_order': sum(r['recommended_quantity'] for r in recommendations),
#             'generated_at': datetime.now().isoformat()
#         }

#         return summary