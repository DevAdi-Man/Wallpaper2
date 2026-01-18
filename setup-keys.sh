#!/bin/bash

# Generate secure keys
APPWRITE_KEY=$(openssl rand -base64 32)
EXECUTOR_SECRET=$(openssl rand -base64 32)

# Replace placeholders in docker-compose.yml using different delimiter
sed -i "s|your-secret-key|$APPWRITE_KEY|g" docker-compose.yml
sed -i "s|your-executor-secret|$EXECUTOR_SECRET|g" docker-compose.yml

echo "Keys generated and updated in docker-compose.yml"
echo "Appwrite Key: $APPWRITE_KEY"
echo "Executor Secret: $EXECUTOR_SECRET"
