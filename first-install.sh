echo "Installing frontend dependencies..."
cd frontend && nohup npm install > frontend-install.log 2>&1 &

echo "Installing backend dependencies..."
cd backend && nohup npm install > backend-install.log 2>&1 &

echo "Installed all dependencies!"