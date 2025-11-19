#!/bin/bash
echo "Pushing in git repository..."

# Stage all files
git add .

# Commit all staged files
git commit -m "add admin dashboard"

# Push from last commit
git push -u origin main
