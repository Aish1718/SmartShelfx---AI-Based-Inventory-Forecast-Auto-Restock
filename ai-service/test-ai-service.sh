BASE_URL="http://localhost:5000"

echo "======================================"
echo "Testing SmartShelfX AI Service"
echo "======================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Test 1: Health Check
echo -e "\n1. Health Check:"
RESPONSE=$(curl -s "$BASE_URL/health")
if echo "$RESPONSE" | grep -q "healthy"; then
    echo -e "${GREEN}✓ PASS${NC}: $RESPONSE"
else
    echo -e "${RED}✗ FAIL${NC}: $RESPONSE"
fi

# Test 2: Database Connection
echo -e "\n2. Database Connection:"
RESPONSE=$(curl -s "$BASE_URL/api/forecast/test-connection")
if echo "$RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✓ PASS${NC}: Database connected"
else
    echo -e "${RED}✗ FAIL${NC}: $RESPONSE"
fi

# Test 3: Get Forecast for Product 1
echo -e "\n3. Get Forecast (Product 1):"
RESPONSE=$(curl -s "$BASE_URL/api/forecast/product/1?days=7")
if echo "$RESPONSE" | grep -q "product_name"; then
    echo -e "${GREEN}✓ PASS${NC}: Forecast generated"
    echo "$RESPONSE" | python -m json.tool 2>/dev/null | head -20
else
    echo -e "${RED}✗ FAIL${NC}: $RESPONSE"
fi

# Test 4: Get Summary
echo -e "\n4. Get Summary:"
RESPONSE=$(curl -s "$BASE_URL/api/forecast/summary")
if echo "$RESPONSE" | grep -q "total_products"; then
    echo -e "${GREEN}✓ PASS${NC}: Summary retrieved"
    echo "$RESPONSE" | python -m json.tool 2>/dev/null
else
    echo -e "${RED}✗ FAIL${NC}: $RESPONSE"
fi

echo -e "\n======================================"
echo "Tests Complete"
echo "======================================"