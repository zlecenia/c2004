#!/bin/bash

# Get current IP address
SERVER_IP=$(hostname -I | awk '{print $1}')

echo "🌐 ConnectID Service Endpoints"
echo "=================================="
echo ""
echo "🖥️  Server IP: $SERVER_IP"
echo ""
echo "📱 User Applications:"
echo "   Frontend:     http://$SERVER_IP:8200"
echo ""
echo "🔧 API Services:"
echo "   Backend API:  http://$SERVER_IP:8101"
echo "   API Docs:     http://$SERVER_IP:8101/docs"
echo "   Health Check: http://$SERVER_IP:8101/api/v1/health"
echo ""
echo "🔗 Integration Points:"
echo "   WebSocket:    ws://$SERVER_IP:8101/ws"
echo "   RFID API:     POST http://$SERVER_IP:8101/api/v1/identification/identify"
echo ""
echo "⚡ Development Tools:"
echo "   HMR Port:     http://$SERVER_IP:24678"
echo "   Redis:        redis://$SERVER_IP:6379"
echo ""
echo "📲 Mobile Access: Open http://$SERVER_IP:8200 on any device in network"
