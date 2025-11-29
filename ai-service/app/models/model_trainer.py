# # ai-service/app/models/model_trainer.py
# import pandas as pd
# import joblib
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_absolute_error
# import os


# class ModelTrainer:
#     def __init__(self, model_path="models/forecast_model.pkl"):
#         self.model_path = model_path

#     def train(self, df: pd.DataFrame):
#         """
#         df must contain columns:
#         ['date', 'sales']
#         """
#         df["day"] = pd.to_datetime(df["date"]).dt.dayofyear

#         X = df[["day"]]
#         y = df["sales"]

#         X_train, X_test, y_train, y_test = train_test_split(
#             X, y, test_size=0.2, random_state=42
#         )

#         model = RandomForestRegressor(n_estimators=200, random_state=42)
#         model.fit(X_train, y_train)

#         preds = model.predict(X_test)
#         mae = mean_absolute_error(y_test, preds)

#         os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
#         joblib.dump(model, self.model_path)

#         return {"mae": mae, "model_path": self.model_path}
