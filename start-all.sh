echo "======================================"
echo "Starting SmartShelfX Services"
echo "======================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if MySQL is running
echo -e "${BLUE}Checking MySQL...${NC}"
if ! mysql -u root -proot -e "SELECT 1" > /dev/null 2>&1; then
    echo -e "${YELLOW}MySQL is not running. Starting MySQL...${NC}"
    sudo systemctl start mysql 2>/dev/null || brew services start mysql 2>/dev/null
    sleep 2
fi

# Start Python AI Service
echo -e "${BLUE}Starting AI Service (Port 5000)...${NC}"
cd ai-service
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
python app/main.py > ../logs/ai-service.log 2>&1 &
AI_PID=$!
echo -e "${GREEN}AI Service started with PID: $AI_PID${NC}"
cd ..

sleep 3

# Start Java Backend
echo -e "${BLUE}Starting Java Backend (Port 8080)...${NC}"
cd backend
mvn spring-boot:run > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}Backend started with PID: $BACKEND_PID${NC}"
cd ..

sleep 10

# Start React Frontend
echo -e "${BLUE}Starting React Frontend (Port 3000)...${NC}"
cd frontend
npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started with PID: $FRONTEND_PID${NC}"
cd ..

echo ""
echo "======================================"
echo -e "${GREEN}All services started!${NC}"
echo "======================================"
echo "AI Service:  http://localhost:5000"
echo "Backend API: http://localhost:8080"
echo "Frontend UI: http://localhost:3000"
echo ""
echo "Process IDs:"
echo "AI Service: $AI_PID"
echo "Backend:    $BACKEND_PID"
echo "Frontend:   $FRONTEND_PID"
echo ""
echo "To stop all services, run: ./stop-all.sh"
echo "======================================"

# Save PIDs to file for stop script
echo "$AI_PID" > .pids
echo "$BACKEND_PID" >> .pids
echo "$FRONTEND_PID" >> .pids