# # models package initializer
# from .forecast_model import DemandForecastModel
# from .model_trainer import ModelTrainer


# from flask import Flask
# from flask_cors import CORS

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object('app.config.Config')

#     CORS(app, resources={r"/api/*": {"origins": "*"}})

#     from app.routes.forecast_routes import forecast_bp
#     app.register_blueprint(forecast_bp, url_prefix='/api')

#     return app
