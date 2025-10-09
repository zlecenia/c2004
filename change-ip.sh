#!/bin/bash

# Script to change IP address for external access
if [ -z "$1" ]; then
    echo "Usage: $0 <IP_ADDRESS>"
    echo "Example: $0 192.168.1.100"
    echo "Current IP: $(hostname -I | awk '{print $1}')"
    exit 1
fi

NEW_IP=$1
echo "🔄 Changing IP to: $NEW_IP"

# Update .env file
sed -i "s|VITE_API_URL=http://.*:8101|VITE_API_URL=http://$NEW_IP:8101|" .env
sed -i "s|VITE_WS_URL=ws://.*:8101|VITE_WS_URL=ws://$NEW_IP:8101|" .env
sed -i "s|VITE_CDN_URL=http://.*:9000|VITE_CDN_URL=http://$NEW_IP:9000|" .env

# Update CORS origins
OLD_CORS=$(grep "CORS_ORIGINS=" .env | cut -d'=' -f2)
NEW_CORS=$(echo $OLD_CORS | sed "s|192\.168\.[0-9]*\.[0-9]*|$NEW_IP|g")
sed -i "s|CORS_ORIGINS=.*|CORS_ORIGINS=$NEW_CORS|" .env

echo "✅ Configuration updated for IP: $NEW_IP"
echo "🔄 Restarting services..."

# Restart services
docker compose down
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

echo "🎉 Application available at:"
echo "   Frontend: http://$NEW_IP:8200"
echo "   Backend:  http://$NEW_IP:8101"
echo "   API Docs: http://$NEW_IP:8101/docs"
