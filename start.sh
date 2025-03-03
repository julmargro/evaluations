#!/bin/bash

echo "Starting Docker containers if not already started..."
docker compose up -d

if [ $? -ne 0 ]; then
  echo "Failed to start Docker containers."
  exit 1
fi

echo "Starting backend server..."
cd backend || { echo "Backend directory not found"; exit 1; }

# Use different commands for Windows and macOS
if [[ "$OSTYPE" == "msys" ]]; then
  start /B node server.js > backend.log 2>&1
else
  nohup node server.js > backend.log 2>&1 &
fi

if [ $? -ne 0 ]; then
  echo "Failed to start backend server."
  exit 1
fi
cd ..

echo "Starting frontend server..."
cd frontend || { echo "Frontend directory not found"; exit 1; }

# Use different commands for Windows and macOS
if [[ "$OSTYPE" == "msys" ]]; then
  start /B npm run dev > frontend.log 2>&1
else
  nohup npm run dev > frontend.log 2>&1 &
fi

if [ $? -ne 0 ]; then
  echo "Failed to start frontend server."
  exit 1
fi
cd ..

echo "App is now running!"

# Wait for frontend to be available before opening browser
echo "Waiting for frontend to start..."
sleep 10  # Adjust if necessary

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