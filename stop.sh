echo "Stopping frontend server..."
pkill -f "npm run dev"

echo "Stopping backend server..."
pkill -f "node server.js"

echo "Frontend and backend servers have been stopped."