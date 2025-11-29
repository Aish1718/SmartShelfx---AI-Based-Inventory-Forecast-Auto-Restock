# # ai-service/app/routes/restock_routes.py
# from flask import Blueprint, request, jsonify
# from app.services.restock_service import RestockService
# from app.services.purchase_order_service import PurchaseOrderService
# from app.services.notification_service import NotificationService
# from functools import wraps
# import traceback

# restock_bp = Blueprint('restock', __name__)
# restock_service = RestockService()
# po_service = PurchaseOrderService()
# notification_service = NotificationService()

# def handle_errors(f):
#     """Decorator to handle errors"""
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         try:
#             return f(*args, **kwargs)
#         except Exception as e:
#             print(f"Error in {f.__name__}: {str(e)}")
#             print(traceback.format_exc())
#             return jsonify({
#                 'error': str(e),
#                 'message': 'An error occurred processing your request'
#             }), 500
#     return decorated_function

# @restock_bp.route('/restock/recommendations', methods=['GET'])
# @handle_errors
# def get_restock_recommendations():
#     """
#     Get AI-powered restock recommendations

#     Query Parameters:
#         - product_ids: Comma-separated product IDs (optional)

#     Example: GET /api/restock/recommendations?product_ids=1,2,3
#     """
#     product_ids_param = request.args.get('product_ids', None)
#     product_ids = None

#     if product_ids_param:
#         try:
#             product_ids = [int(id.strip()) for id in product_ids_param.split(',')]
#         except ValueError:
#             return jsonify({'error': 'Invalid product_ids format'}), 400

#     recommendations = restock_service.generate_restock_recommendations(product_ids)

#     if isinstance(recommendations, dict) and 'error' in recommendations:
#         return jsonify(recommendations), 400

#     return jsonify({
#         'total': len(recommendations),
#         'recommendations': recommendations,
#         'generated_at': datetime.now().isoformat()
#     }), 200

# @restock_bp.route('/restock/summary', methods=['GET'])
# @handle_errors
# def get_restock_summary():
#     """
#     Get summary statistics for restocking needs

#     Example: GET /api/restock/summary
#     """
#     summary = restock_service.get_restock_summary()

#     if isinstance(summary, dict) and 'error' in summary:
#         return jsonify(summary), 400

#     return jsonify(summary), 200

# @restock_bp.route('/purchase-orders/create', methods=['POST'])
# @handle_errors
# def create_purchase_order():
#     """
#     Create a purchase order

#     Request Body:
#     {
#         "items": [
#             {
#                 "product_id": 1,
#                 "quantity": 100,
#                 "unit_price": 50.00
#             }
#         ],
#         "vendor_id": 1,
#         "auto_approve": false
#     }

#     Example: POST /api/purchase-orders/create
#     """
#     data = request.get_json()

#     if not data or 'items' not in data:
#         return jsonify({'error': 'Items are required'}), 400

#     items = data['items']
#     vendor_id = data.get('vendor_id')
#     auto_approve = data.get('auto_approve', False)

#     po = po_service.create_purchase_order(items, vendor_id, auto_approve)

#     return jsonify({
#         'message': 'Purchase order created successfully',
#         'purchase_order': po
#     }), 201

# @restock_bp.route('/purchase-orders/create-from-recommendations', methods=['POST'])
# @handle_errors
# def create_po_from_recommendations():
#     """
#     Create purchase orders from restock recommendations

#     Request Body:
#     {
#         "product_ids": [1, 2, 3],  // Optional
#         "group_by_vendor": true,
#         "auto_approve": false
#     }

#     Example: POST /api/purchase-orders/create-from-recommendations
#     """
#     data = request.get_json() or {}

#     product_ids = data.get('product_ids')
#     group_by_vendor = data.get('group_by_vendor', True)
#     auto_approve = data.get('auto_approve', False)

#     # Get recommendations
#     recommendations = restock_service.generate_restock_recommendations(product_ids)

#     if isinstance(recommendations, dict) and 'error' in recommendations:
#         return jsonify(recommendations), 400

#     if not recommendations:
#         return jsonify({
#             'message': 'No products need restocking at this time',
#             'recommendations': []
#         }), 200

#     # Create purchase orders
#     purchase_orders = po_service.create_bulk_purchase_orders(
#         recommendations,
#         group_by_vendor=group_by_vendor
#     )

#     return jsonify({
#         'message': f'Created {len(purchase_orders)} purchase order(s)',
#         'purchase_orders': purchase_orders,
#         'total_items': sum(len(po['items']) for po in purchase_orders)
#     }), 201

# @restock_bp.route('/purchase-orders/<int:po_id>', methods=['GET'])
# @handle_errors
# def get_purchase_order(po_id):
#     """
#     Get purchase order details

#     Example: GET /api/purchase-orders/1
#     """
#     po = po_service.get_purchase_order(po_id)

#     if not po:
#         return jsonify({'error': 'Purchase order not found'}), 404

#     return jsonify(po), 200

# @restock_bp.route('/purchase-orders/<int:po_id>/status', methods=['PUT'])
# @handle_errors
# def update_po_status(po_id):
#     """
#     Update purchase order status

#     Request Body:
#     {
#         "status": "APPROVED"  // PENDING, APPROVED, SENT, RECEIVED, CANCELLED
#     }

#     Example: PUT /api/purchase-orders/1/status
#     """
#     data = request.get_json()

#     if not data or 'status' not in data:
#         return jsonify({'error': 'Status is required'}), 400

#     result = po_service.update_po_status(po_id, data['status'])

#     if isinstance(result, dict) and 'error' in result:
#         return jsonify(result), 400

#     return jsonify({
#         'message': 'Status updated successfully',
#         'purchase_order': result
#     }), 200

# @restock_bp.route('/notifications/send-po', methods=['POST'])
# @handle_errors
# def send_po_notification():
#     """
#     Send purchase order to vendor via email

#     Request Body:
#     {
#         "po_id": 1,
#         "vendor_email": "vendor@example.com"
#     }

#     Example: POST /api/notifications/send-po
#     """
#     data = request.get_json()

#     if not data or 'po_id' not in data or 'vendor_email' not in data:
#         return jsonify({'error': 'po_id and vendor_email are required'}), 400

#     # Get PO details
#     po = po_service.get_purchase_order(data['po_id'])

#     if not po:
#         return jsonify({'error': 'Purchase order not found'}), 404

#     # Send email
#     result = notification_service.send_purchase_order_email(
#         data['vendor_email'],
#         po
#     )

#     if not result['success']:
#         return jsonify(result), 500

#     return jsonify({
#         'message': 'Purchase order sent successfully',
#         'recipient': data['vendor_email']
#     }), 200

# @restock_bp.route('/notifications/stockout-alert', methods=['POST'])
# @handle_errors
# def send_stockout_alert():
#     """
#     Send stockout alert to manager

#     Request Body:
#     {
#         "recipient_email": "manager@example.com"
#     }

#     Example: POST /api/notifications/stockout-alert
#     """
#     data = request.get_json()

#     if not data or 'recipient_email' not in data:
#         return jsonify({'error': 'recipient_email is required'}), 400

#     # Get products at risk
#     from app.services.forecast_service import ForecastService
#     forecast_service = ForecastService()
#     products_at_risk = forecast_service.get_products_at_risk()

#     if not products_at_risk or len(products_at_risk) == 0:
#         return jsonify({
#             'message': 'No products at risk. Alert not sent.',
#             'products_at_risk': 0
#         }), 200

#     # Send alert
#     result = notification_service.send_stockout_alert(
#         data['recipient_email'],
#         products_at_risk
#     )

#     if not result['success']:
#         return jsonify(result), 500

#     return jsonify({
#         'message': 'Alert sent successfully',
#         'recipient': data['recipient_email'],
#         'products_at_risk': len(products_at_risk)
#     }), 200