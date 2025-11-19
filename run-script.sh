#!/bin/bash
echo "Starting MERN application..."

# Start backend server in background from backend directory
(cd backend && npm run server) &

# Start frontend dev server from frontend directory
cd frontend && npm run dev
