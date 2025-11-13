# ============================================
# README.md for ai-service/
# ============================================
# SmartShelfX AI Forecasting Service

Python-based machine learning service for demand forecasting.

## Setup

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your MySQL credentials

# Run service
python app/main.py
```

## API Endpoints

- GET /health - Health check
- GET /api/forecast/product/{id}?days=30 - Get forecast for product
- POST /api/forecast/bulk - Get bulk forecasts
- GET /api/forecast/at-risk - Get products at risk
- GET /api/forecast/summary - Get summary statistics
- GET /api/forecast/test-connection - Test database connection

## Testing

```bash
# Test all endpoints
./test-ai-service.sh

# Test specific endpoint
curl http://localhost:5000/api/forecast/product/1
```

## Features

- Random Forest regression model
- 30-day demand forecasting
- Risk analysis and recommendations
- Historical trend analysis
- Confidence scoring

## Requirements

- Python 3.9+
- MySQL 8.0+
- At least 30 days of transaction history per product