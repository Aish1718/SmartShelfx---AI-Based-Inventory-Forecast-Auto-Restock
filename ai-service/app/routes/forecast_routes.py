from flask import Blueprint, request, jsonify
from app.services.forecast_service import ForecastService
from functools import wraps
import traceback

forecast_bp = Blueprint('forecast', __name__)
forecast_service = ForecastService()

def handle_errors(f):
    """Decorator to handle errors"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            print(f"Error in {f.__name__}: {str(e)}")
            print(traceback.format_exc())
            return jsonify({
                'error': str(e),
                'message': 'An error occurred processing your request'
            }), 500
    return decorated_function

@forecast_bp.route('/forecast/product/<int:product_id>', methods=['GET'])
@handle_errors
def forecast_product(product_id):
    """
    Generate forecast for a specific product

    Query Parameters:
        - days: Number of days to forecast (default: 30)

    Example: GET /api/forecast/product/1?days=30
    """
    forecast_days = request.args.get('days', default=30, type=int)

    if forecast_days < 1 or forecast_days > 90:
        return jsonify({'error': 'Forecast days must be between 1 and 90'}), 400

    result = forecast_service.generate_forecast(product_id, forecast_days)

    if 'error' in result:
        return jsonify(result), 400

    return jsonify(result), 200

@forecast_bp.route('/forecast/bulk', methods=['POST'])
@handle_errors
def forecast_bulk():
    """
    Generate forecasts for multiple products

    Request Body:
    {
        "product_ids": [1, 2, 3]  // Optional, if not provided forecasts all products
    }

    Example: POST /api/forecast/bulk
    {
        "product_ids": [1, 2, 3]
    }
    """
    data = request.get_json() or {}
    product_ids = data.get('product_ids', None)

    results = forecast_service.generate_bulk_forecast(product_ids)

    if isinstance(results, dict) and 'error' in results:
        return jsonify(results), 400

    return jsonify({
        'total': len(results),
        'forecasts': results
    }), 200

@forecast_bp.route('/forecast/at-risk', methods=['GET'])
@handle_errors
def products_at_risk():
    """
    Get products at risk of stockout based on forecasts

    Example: GET /api/forecast/at-risk
    """
    results = forecast_service.get_products_at_risk()

    if isinstance(results, dict) and 'error' in results:
        return jsonify(results), 400

    return jsonify({
        'total': len(results),
        'products': results
    }), 200

@forecast_bp.route('/forecast/summary', methods=['GET'])
@handle_errors
def forecast_summary():
    """
    Get summary of all product forecasts

    Example: GET /api/forecast/summary
    """
    forecasts = forecast_service.generate_bulk_forecast()

    if isinstance(forecasts, dict) and 'error' in forecasts:
        return jsonify(forecasts), 400

    # Calculate summary statistics
    summary = {
        'total_products': len(forecasts),
        'products_at_risk': len([f for f in forecasts if f.get('at_risk', False)]),
        'critical_risk': len([f for f in forecasts if f.get('risk_level') == 'CRITICAL']),
        'high_risk': len([f for f in forecasts if f.get('risk_level') == 'HIGH']),
        'medium_risk': len([f for f in forecasts if f.get('risk_level') == 'MEDIUM']),
        'low_risk': len([f for f in forecasts if f.get('risk_level') == 'LOW']),
        'avg_confidence': round(sum(f.get('confidence_score', 0) for f in forecasts) / len(forecasts), 2) if forecasts else 0,
        'total_predicted_demand_7days': sum(f.get('predicted_demand_7days', 0) for f in forecasts)
    }

    return jsonify(summary), 200

@forecast_bp.route('/forecast/test-connection', methods=['GET'])
@handle_errors
def test_connection():
    """
    Test database connection

    Example: GET /api/forecast/test-connection
    """
    from app.utils.database import DatabaseConnection

    db = DatabaseConnection()
    connection = db.connect()

    if connection:
        db.disconnect()
        return jsonify({
            'status': 'success',
            'message': 'Database connection successful'
        }), 200
    else:
        return jsonify({
            'status': 'error',
            'message': 'Database connection failed'
        }), 500