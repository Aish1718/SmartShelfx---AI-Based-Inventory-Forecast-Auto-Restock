import os
import json
from app.config import Config

# google generative ai SDK
import google.generativeai as genai

# configure
genai.configure(api_key=Config.GEMINI_API_KEY)

def _build_prompt(product, history_records, days):
    """
    Build a prompt that asks Gemini to return structured JSON.
    history_records: list of dicts {transaction_date, quantity_in, quantity_out}
    """
    history_lines = []
    for r in history_records:
        date = str(r.get("transaction_date"))
        qi = int(r.get("quantity_in") or 0)
        qo = int(r.get("quantity_out") or 0)
        history_lines.append(f"{date} | IN:{qi} | OUT:{qo}")
    history_text = "\n".join(history_lines) if history_lines else "No transactions"

    prompt = f"""
You are an expert inventory forecaster.

Product:
- id: {product.get('id')}
- name: {product.get('name')}
- sku: {product.get('sku')}
- currentStock: {product.get('currentStock')}
- reorderLevel: {product.get('reorderLevel')}
- price: {product.get('price')}

Historical daily transactions (most recent first):
{history_text}

Task:
1) Provide predicted demand totals for next 7, 14 and {days} days (integers).
2) Estimate risk_level: one of LOW, MEDIUM, HIGH, CRITICAL.
3) Provide suggested_reorder_quantity (integer); explain how many to order and why.
4) Provide simple recommended action: e.g. "Order now", "Monitor", "No action".
5) Return valid JSON only with keys:
   forecast_next_7_days,
   forecast_next_14_days,
   forecast_next_{days}_days,
   risk_level,
   suggested_reorder_quantity,
   recommended_action,
   explanation

Make sure the JSON uses only double quotes and numbers where appropriate.
"""
    return prompt.strip()

def get_forecast(product, history_df, days=30):
    """
    product: dict from DB (keys: id,name,sku,currentStock,reorderLevel,price)
    history_df: pandas.DataFrame or list of dicts with transaction_date,quantity_in,quantity_out
    """
    # Convert history to list of dicts
    if history_df is None:
        history_records = []
    else:
        try:
            history_records = history_df.to_dict("records")
        except:
            history_records = history_df if isinstance(history_df, list) else []

    prompt = _build_prompt(product, history_records[-90:], days)

    try:
        # Use chat interface to get structured JSON response
        resp = genai.chat.create(
            model=Config.GEMINI_MODEL,
            messages=[
                {"role": "system", "content": "You generate concise JSON forecasts for inventory systems."},
                {"role": "user", "content": prompt}
            ],
            max_output_tokens=600
        )

        text = resp.choices[0].message.get("content", "") if resp.choices else ""
        # Some responses might come with surrounding text; try to extract JSON
        text = text.strip()
        # Find first '{' and last '}' to extract JSON block
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1:
            json_text = text[start:end+1]
        else:
            json_text = text

        result = json.loads(json_text)
        return {"ok": True, "data": result}

    except Exception as e:
        # Return error object so the API layer can make a 400 / 500 response
        return {"ok": False, "error": str(e)}
