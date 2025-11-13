import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os
from app.config import Config
from datetime import datetime, timedelta

class DemandForecastModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.feature_columns = Config.FEATURES
        self.model_path = os.path.join(Config.MODEL_DIR, Config.MODEL_NAME)

    def train(self, X, y, model_type='random_forest'):
        """
        Train the forecasting model

        Args:
            X: Features (pandas DataFrame)
            y: Target variable (demand)
            model_type: Type of model ('random_forest', 'gradient_boosting', 'linear')
        """
        if X is None or y is None or len(X) == 0:
            raise ValueError("Training data is empty")

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, shuffle=False
        )

        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)

        # Select and train model
        if model_type == 'random_forest':
            self.model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                min_samples_split=5,
                min_samples_leaf=2,
                random_state=42
            )
        elif model_type == 'gradient_boosting':
            self.model = GradientBoostingRegressor(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=5,
                random_state=42
            )
        else:  # linear regression
            self.model = LinearRegression()

        # Train
        self.model.fit(X_train_scaled, y_train)

        # Evaluate
        y_pred = self.model.predict(X_test_scaled)

        metrics = {
            'mae': mean_absolute_error(y_test, y_pred),
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'r2': r2_score(y_test, y_pred),
            'train_samples': len(X_train),
            'test_samples': len(X_test)
        }

        return metrics

    def predict(self, X):
        """
        Make predictions
        """
        if self.model is None:
            raise ValueError("Model not trained. Train the model first.")

        if X is None or len(X) == 0:
            return None

        X_scaled = self.scaler.transform(X)
        predictions = self.model.predict(X_scaled)

        # Ensure non-negative predictions
        predictions = np.maximum(predictions, 0)

        return predictions

    def save_model(self):
        """
        Save trained model and scaler
        """
        if self.model is None:
            raise ValueError("No model to save")

        # Create models directory if it doesn't exist
        os.makedirs(Config.MODEL_DIR, exist_ok=True)

        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'feature_columns': self.feature_columns,
            'timestamp': datetime.now()
        }

        joblib.dump(model_data, self.model_path)

    def load_model(self):
        """
        Load trained model and scaler
        """
        if not os.path.exists(self.model_path):
            return False

        try:
            model_data = joblib.load(self.model_path)
            self.model = model_data['model']
            self.scaler = model_data['scaler']
            self.feature_columns = model_data['feature_columns']
            return True
        except Exception as e:
            print(f"Error loading model: {e}")
            return False