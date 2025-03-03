#!/bin/bash

echo "Stopping and restarting Docker containers..."
docker compose down -v && docker compose up -d

echo "Starting backend server..."
cd backend && nohup node server.js > backend.log 2>&1 &

echo "Starting frontend server..."
cd frontend && nohup npm run dev > frontend.log 2>&1 &

echo "App is now running!"

# Wait for frontend to be available before opening browser
echo "Waiting for frontend to start..."
sleep 5  # Adjust if necessary

# Open the browser with localhost:3000/login
if which xdg-open > /dev/null; then
    xdg-open http://localhost:3000/login  # Linux
elif which open > /dev/null; then
    open http://localhost:3000/login  # macOS
elif which start > /dev/null; then
    start http://localhost:3000/login  # Windows (Git Bash)
else
    echo "Please open http://localhost:3000/login manually."
fi