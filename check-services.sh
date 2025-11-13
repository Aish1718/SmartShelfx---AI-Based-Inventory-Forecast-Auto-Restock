echo "======================================"
echo "SmartShelfX Services Status"
echo "======================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check MySQL
echo -n "MySQL (3306):     "
if mysql -u root -proot -e "SELECT 1" > /dev/null 2>&1; then
    echo -e "${GREEN}RUNNING${NC}"
else
    echo -e "${RED}STOPPED${NC}"
fi

# Check AI Service
echo -n "AI Service (5000): "
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo -e "${GREEN}RUNNING${NC}"
else
    echo -e "${RED}STOPPED${NC}"
fi

# Check Java Backend
echo -n "Backend (8080):    "
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo -e "${GREEN}RUNNING${NC}"
else
    echo -e "${RED}STOPPED${NC}"
fi

# Check Frontend
echo -n "Frontend (3000):   "
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}RUNNING${NC}"
else
    echo -e "${RED}STOPPED${NC}"
fi

echo "======================================"