#!/bin/bash

# Docker build script for User Management System
# Usage: ./scripts/docker-build.sh [tag]

set -e

# Default tag
TAG=${1:-latest}
IMAGE_NAME="user-management-system"

echo "🐳 Building Docker image: $IMAGE_NAME:$TAG"

# Build the Docker image
docker build -t "$IMAGE_NAME:$TAG" .

echo "✅ Docker image built successfully: $IMAGE_NAME:$TAG"

# Display image size
echo "📦 Image size:"
docker images "$IMAGE_NAME:$TAG" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

echo ""
echo "🚀 To run the container:"
echo "docker run -p 3000:3000 --env-file .env $IMAGE_NAME:$TAG"
echo ""
echo "🐳 To run with Docker Compose (production):"
echo "docker-compose -f docker-compose.prod.yml up -d" 