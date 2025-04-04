#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

DB_CONTAINER_NAME="admin-shad-template-postgres"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# import env variables from .env
set -a
source .env

DB_PASSWORD=$(echo "$POSTGRES_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$POSTGRES_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please change the default password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

docker run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="postgres" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB=admin-shad-template-t3 \
  -p "$DB_PORT":5432 \
  docker.io/postgres && echo "Database container '$DB_CONTAINER_NAME' was successfully created"


#!/usr/bin/env bash
# Use this script to start a docker container for local Redis development

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-redis.sh`

# On Linux/macOS, simply run `./start-redis.sh`

REDIS_CONTAINER_NAME="admin-shad-template-redis"

# 1. Check Docker installation
if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install Docker and try again."
  echo "Docker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# 2. Check Docker daemon
if ! docker info > /dev/null 2>&1; then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

# 3. Check if container is already running
if [ "$(docker ps -q -f name=$REDIS_CONTAINER_NAME)" ]; then
  echo "Redis container '$REDIS_CONTAINER_NAME' is already running."
  exit 0
fi

# 4. Check if container exists but is stopped
if [ "$(docker ps -q -a -f name=$REDIS_CONTAINER_NAME)" ]; then
  docker start "$REDIS_CONTAINER_NAME"
  echo "Existing Redis container '$REDIS_CONTAINER_NAME' has been started."
  exit 0
fi

# 5. No container exists -> create a new one
docker run -d \
  --name $REDIS_CONTAINER_NAME \
  -p 6379:6379 \
  redis:latest && echo "Redis container '$REDIS_CONTAINER_NAME' was successfully created."