#!/bin/bash
echo ">>> Going into Frontend..."
cd ../frontend

echo ">>> Executing Build..."
yarn build

echo ">>> Deploying to Express..."
cd build && cp -r * ../../backend/public/

echo ">>> Deployed all files!"