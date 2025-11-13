from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_forecast_endpoint():
    payload = {
        "productId": 1,
        "forecastDays": 5,
        "includeSeasonalAdjustments": True
    }

    response = client.post("/forecast", json=payload)
    assert response.status_code == 200
    assert "forecastData" in response.json()
