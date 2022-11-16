#!/bin/bash

echo "Pulling from WEARIT"

git pull

echo "Building WEARIT"

docker-compose up -d --build