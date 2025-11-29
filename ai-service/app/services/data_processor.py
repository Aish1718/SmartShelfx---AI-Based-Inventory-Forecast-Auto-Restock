# # ai-service/app/services/data_processorpy
# import pandas as pd


# class DataProcessor:
#     """
#     Cleans and normalizes sales data before passing to model.
#     """

#     @staticmethod
#     def preprocess(df: pd.DataFrame):
#         df = df.copy()
#         df["date"] = pd.to_datetime(df["date"], errors="coerce")
#         df = df.dropna(subset=["date", "sales"])
#         df = df.sort_values("date")

#         # replace missing or bad values
#         df["sales"] = df["sales"].fillna(0).astype(float)

#         return df
