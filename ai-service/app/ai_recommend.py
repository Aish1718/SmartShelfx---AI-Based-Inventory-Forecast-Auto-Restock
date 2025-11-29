import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_forecast(product, history):
    prompt = f"""
You are an inventory forecasting AI.

Product:
{product}

Past stock transactions (date, type, quantity):
{history}

Generate:
- forecast_next_7_days
- forecast_next_14_days
- forecast_next_30_days
- risk_level (LOW / MEDIUM / HIGH / CRITICAL)
- suggested_reorder_quantity
- explanation

Return JSON only.
"""

    response = genai.GenerativeModel("gemini-1.5-pro").generate_content(prompt)
    return response.text
