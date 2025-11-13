echo "======================================"
echo "Stopping SmartShelfX Services"
echo "======================================"

if [ -f .pids ]; then
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            echo "Stopping process $pid..."
            kill $pid 2>/dev/null
        fi
    done < .pids
    rm .pids
    echo "All services stopped!"
else
    echo "No PID file found. Killing by port..."

    # Kill by port
    lsof -ti:5000 | xargs kill -9 2>/dev/null
    lsof -ti:8080 | xargs kill -9 2>/dev/null
    lsof -ti:3000 | xargs kill -9 2>/dev/null

    echo "Services stopped by port!"
fi

echo "======================================"