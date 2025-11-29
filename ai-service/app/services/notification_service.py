# # ai-service/app/services/notification_service.py
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from datetime import datetime
# import os

# class NotificationService:
#     def __init__(self):
#         # Email configuration (use environment variables)
#         self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
#         self.smtp_port = int(os.getenv('SMTP_PORT', 587))
#         self.smtp_user = os.getenv('SMTP_USER', '')
#         self.smtp_password = os.getenv('SMTP_PASSWORD', '')
#         self.from_email = os.getenv('FROM_EMAIL', 'noreply@smartshelfx.com')

#     def send_purchase_order_email(self, vendor_email, po_data):
#         """
#         Send purchase order to vendor via email

#         Args:
#             vendor_email: Vendor's email address
#             po_data: Purchase order data
#         """
#         try:
#             # Create email
#             msg = MIMEMultipart('alternative')
#             msg['Subject'] = f'Purchase Order {po_data["po_number"]}'
#             msg['From'] = self.from_email
#             msg['To'] = vendor_email

#             # Create HTML body
#             html_body = self._create_po_email_html(po_data)

#             # Attach HTML body
#             msg.attach(MIMEText(html_body, 'html'))

#             # Send email
#             with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
#                 server.starttls()
#                 server.login(self.smtp_user, self.smtp_password)
#                 server.send_message(msg)

#             return {
#                 'success': True,
#                 'message': f'Email sent to {vendor_email}'
#             }

#         except Exception as e:
#             return {
#                 'success': False,
#                 'error': str(e)
#             }

#     def _create_po_email_html(self, po_data):
#         """Create HTML email body for purchase order"""
#         items_html = ''
#         for item in po_data['items']:
#             items_html += f'''
#             <tr>
#                 <td style="padding: 10px; border: 1px solid #ddd;">{item['product_name']}</td>
#                 <td style="padding: 10px; border: 1px solid #ddd;">{item['sku']}</td>
#                 <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{item['quantity']}</td>
#                 <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹{item['unit_price']:.2f}</td>
#                 <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹{item['quantity'] * item['unit_price']:.2f}</td>
#             </tr>
#             '''

#         html = f'''
#         <!DOCTYPE html>
#         <html>
#         <head>
#             <style>
#                 body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
#                 .container {{ max-width: 800px; margin: 0 auto; padding: 20px; }}
#                 .header {{ background: #4CAF50; color: white; padding: 20px; text-align: center; }}
#                 .content {{ padding: 20px; background: #f9f9f9; }}
#                 table {{ width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }}
#                 th {{ background: #4CAF50; color: white; padding: 12px; text-align: left; }}
#                 .total-section {{ text-align: right; margin-top: 20px; }}
#                 .footer {{ margin-top: 30px; padding: 20px; background: #333; color: white; text-align: center; }}
#             </style>
#         </head>
#         <body>
#             <div class="container">
#                 <div class="header">
#                     <h1>Purchase Order</h1>
#                     <p>PO Number: {po_data['po_number']}</p>
#                 </div>

#                 <div class="content">
#                     <p><strong>Date:</strong> {po_data['created_at'].strftime('%B %d, %Y')}</p>
#                     <p><strong>Expected Delivery:</strong> {po_data.get('expected_delivery', 'TBD')}</p>
#                     <p><strong>Status:</strong> {po_data['status']}</p>

#                     <h2>Order Items</h2>
#                     <table>
#                         <thead>
#                             <tr>
#                                 <th>Product Name</th>
#                                 <th>SKU</th>
#                                 <th style="text-align: center;">Quantity</th>
#                                 <th style="text-align: right;">Unit Price</th>
#                                 <th style="text-align: right;">Total</th>
#                             </tr>
#                         </thead>
#                         <tbody>
#                             {items_html}
#                         </tbody>
#                     </table>

#                     <div class="total-section">
#                         <p><strong>Subtotal:</strong> ₹{po_data['subtotal']:.2f}</p>
#                         <p><strong>Tax (18%):</strong> ₹{po_data['tax']:.2f}</p>
#                         <h3><strong>Grand Total:</strong> ₹{po_data['total']:.2f}</h3>
#                     </div>

#                     <p style="margin-top: 30px;"><strong>Notes:</strong><br>{po_data.get('notes', 'N/A')}</p>
#                 </div>

#                 <div class="footer">
#                     <p>SmartShelfX - AI-Powered Inventory Management</p>
#                     <p>This is an automated purchase order generated by our AI forecasting system.</p>
#                 </div>
#             </div>
#         </body>
#         </html>
#         '''

#         return html

#     def send_stockout_alert(self, recipient_email, products_at_risk):
#         """
#         Send alert about products at risk of stockout

#         Args:
#             recipient_email: Manager's email
#             products_at_risk: List of products at risk
#         """
#         try:
#             msg = MIMEMultipart('alternative')
#             msg['Subject'] = f'ALERT: {len(products_at_risk)} Products at Risk of Stockout'
#             msg['From'] = self.from_email
#             msg['To'] = recipient_email

#             # Create HTML
#             products_html = ''
#             for product in products_at_risk[:10]:  # Top 10
#                 products_html += f'''
#                 <tr>
#                     <td style="padding: 10px; border: 1px solid #ddd;">{product['product_name']}</td>
#                     <td style="padding: 10px; border: 1px solid #ddd;">{product['sku']}</td>
#                     <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{product['current_stock']}</td>
#                     <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{product['predicted_demand_7days']}</td>
#                     <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
#                         <span style="background: {'#f44336' if product['risk_level'] == 'CRITICAL' else '#ff9800' if product['risk_level'] == 'HIGH' else '#ffc107'};
#                                      color: white; padding: 5px 10px; border-radius: 3px;">
#                             {product['risk_level']}
#                         </span>
#                     </td>
#                 </tr>
#                 '''

#             html = f'''
#             <!DOCTYPE html>
#             <html>
#             <head>
#                 <style>
#                     body {{ font-family: Arial, sans-serif; color: #333; }}
#                     .container {{ max-width: 800px; margin: 0 auto; padding: 20px; }}
#                     .alert-header {{ background: #f44336; color: white; padding: 20px; text-align: center; }}
#                     table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
#                     th {{ background: #333; color: white; padding: 12px; text-align: left; }}
#                 </style>
#             </head>
#             <body>
#                 <div class="container">
#                     <div class="alert-header">
#                         <h1>⚠️ Stockout Risk Alert</h1>
#                         <p>{len(products_at_risk)} products need immediate attention</p>
#                     </div>

#                     <h2>Products at Risk</h2>
#                     <table>
#                         <thead>
#                             <tr>
#                                 <th>Product</th>
#                                 <th>SKU</th>
#                                 <th>Current Stock</th>
#                                 <th>7-Day Forecast</th>
#                                 <th>Risk Level</th>
#                             </tr>
#                         </thead>
#                         <tbody>
#                             {products_html}
#                         </tbody>
#                     </table>

#                     <p><strong>Action Required:</strong> Please review and approve restocking recommendations.</p>
#                 </div>
#             </body>
#             </html>
#             '''

#             msg.attach(MIMEText(html, 'html'))

#             with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
#                 server.starttls()
#                 server.login(self.smtp_user, self.smtp_password)
#                 server.send_message(msg)

#             return {'success': True}

#         except Exception as e:
#             return {'success': False, 'error': str(e)}

#     def send_sms_notification(self, phone_number, message):
#         """
#         Send SMS notification (placeholder - integrate with Twilio/SMS Gateway)

#         Args:
#             phone_number: Recipient phone number
#             message: SMS message
#         """
#         # TODO: Integrate with SMS gateway (Twilio, AWS SNS, etc.)
#         print(f"SMS to {phone_number}: {message}")

#         return {
#             'success': True,
#             'message': 'SMS feature requires SMS gateway integration'
#         }