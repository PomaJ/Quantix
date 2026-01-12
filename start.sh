#!/bin/bash

# Kill any existing processes on ports 8000 (API) and 3000 (Frontend)
lsof -ti:8000 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "🚀 Starting Quantix Dashboard..."

# 1. Start Backend (Background)
echo "🐍 Starting Python Backend on port 8000..."
cd src/backend
# Check if uvicorn is installed, if not try to run with python directly assuming it's in main block
if command -v uvicorn &> /dev/null; then
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
else
    python main.py &
fi
BACKEND_PID=$!
cd ../..

# Wait a moment for backend
sleep 2

# 2. Start Frontend (Background)
echo "🌐 Starting Frontend Server on port 3000..."
cd src/frontend
python3 -m http.server 3000 &
FRONTEND_PID=$!

echo ""
echo "✅ System is running!"
echo "   -> Frontend: http://localhost:3000"
echo "   -> Backend:  http://localhost:8000"
echo ""
echo "Press CTRL+C to stop everything."

# Wait for user to exit
wait $FRONTEND_PID $BACKEND_PID
