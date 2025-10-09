#!/bin/bash
# scripts/system-diagnostics.sh - System diagnostics after Docker startup

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="http://localhost:8101"
FRONTEND_URL="http://localhost:8200"
MAX_RETRIES=30
RETRY_DELAY=2

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "INFO") echo -e "${BLUE}ℹ️  $message${NC}" ;;
        "SUCCESS") echo -e "${GREEN}✅ $message${NC}" ;;
        "WARNING") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "ERROR") echo -e "${RED}❌ $message${NC}" ;;
        "HEADER") echo -e "${PURPLE}🔧 $message${NC}" ;;
    esac
}

# Function to check if service is responding
check_service() {
    local url=$1
    local service_name=$2
    local retries=0
    
    print_status "INFO" "Checking $service_name connection: $url"
    
    while [ $retries -lt $MAX_RETRIES ]; do
        if curl -s -f -m 5 "$url" > /dev/null 2>&1; then
            print_status "SUCCESS" "$service_name is responding"
            return 0
        fi
        
        retries=$((retries + 1))
        if [ $retries -lt $MAX_RETRIES ]; then
            print_status "INFO" "Retry $retries/$MAX_RETRIES for $service_name in ${RETRY_DELAY}s..."
            sleep $RETRY_DELAY
        fi
    done
    
    print_status "ERROR" "$service_name failed to respond after $MAX_RETRIES attempts"
    return 1
}

# Function to get and display diagnostics
get_diagnostics() {
    local url="$BACKEND_URL/api/diagnostics"
    
    print_status "INFO" "Fetching system diagnostics from: $url"
    
    # Try to get diagnostics with timeout
    local response=$(curl -s -m 10 "$url" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$response" ]; then
        print_status "SUCCESS" "Diagnostics retrieved successfully"
        
        # Parse and display key information using jq if available
        if command -v jq &> /dev/null; then
            echo ""
            print_status "HEADER" "=== SYSTEM DIAGNOSTICS REPORT ==="
            
            # Overall status
            local overall_status=$(echo "$response" | jq -r '.overall_status // "unknown"')
            local diagnosis_time=$(echo "$response" | jq -r '.diagnosis_time_ms // "unknown"')
            echo -e "${CYAN}Overall Status:${NC} $overall_status (${diagnosis_time}ms)"
            
            # Timestamp
            local timestamp=$(echo "$response" | jq -r '.timestamp // "unknown"')
            echo -e "${CYAN}Timestamp:${NC} $timestamp"
            echo ""
            
            # Services status
            print_status "HEADER" "Services Status:"
            
            # Redis
            local redis_status=$(echo "$response" | jq -r '.services.redis.status // "unknown"')
            local redis_ping=$(echo "$response" | jq -r '.services.redis.ping_time_ms // "N/A"')
            local redis_version=$(echo "$response" | jq -r '.services.redis.version // "N/A"')
            if [ "$redis_status" = "healthy" ]; then
                print_status "SUCCESS" "Redis: $redis_status (${redis_ping}ms, v$redis_version)"
            else
                print_status "ERROR" "Redis: $redis_status"
            fi
            
            # Database
            local db_status=$(echo "$response" | jq -r '.services.database.status // "unknown"')
            print_status "INFO" "Database: $db_status"
            
            # System Resources
            local cpu_usage=$(echo "$response" | jq -r '.services.system_resources.cpu.usage_percent // "N/A"')
            local memory_usage=$(echo "$response" | jq -r '.services.system_resources.memory.usage_percent // "N/A"')
            local memory_available=$(echo "$response" | jq -r '.services.system_resources.memory.available_human // "N/A"')
            
            if [ "$cpu_usage" != "N/A" ]; then
                print_status "INFO" "CPU Usage: ${cpu_usage}%"
            fi
            if [ "$memory_usage" != "N/A" ]; then
                print_status "INFO" "Memory: ${memory_usage}% used, ${memory_available} available"
            fi
            
            # External Services
            local frontend_status=$(echo "$response" | jq -r '.services.external_services[0].status // "unknown"' 2>/dev/null)
            if [ "$frontend_status" != "unknown" ] && [ "$frontend_status" != "null" ]; then
                if [ "$frontend_status" = "healthy" ]; then
                    print_status "SUCCESS" "Frontend: $frontend_status"
                else
                    print_status "WARNING" "Frontend: $frontend_status"
                fi
            fi
            
            echo ""
            # Recommendations
            print_status "HEADER" "System Recommendations:"
            local recommendations=$(echo "$response" | jq -r '.recommendations[]? // empty')
            if [ -n "$recommendations" ]; then
                echo "$recommendations" | while read -r rec; do
                    if [[ $rec == *"🔴"* ]] || [[ $rec == *"Critical"* ]]; then
                        print_status "ERROR" "$rec"
                    elif [[ $rec == *"🟡"* ]] || [[ $rec == *"🟠"* ]]; then
                        print_status "WARNING" "$rec"
                    elif [[ $rec == *"🔵"* ]]; then
                        print_status "INFO" "$rec"
                    else
                        print_status "SUCCESS" "$rec"
                    fi
                done
            fi
            
            echo ""
            # Environment info
            print_status "HEADER" "Environment Information:"
            local environment=$(echo "$response" | jq -r '.environment.environment // "unknown"')
            local container_id=$(echo "$response" | jq -r '.environment.container_id // "unknown"')
            echo -e "${CYAN}Environment:${NC} $environment"
            echo -e "${CYAN}Container ID:${NC} $container_id"
            
        else
            # Fallback if jq is not available
            print_status "WARNING" "jq not available - showing raw diagnostics"
            echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
        fi
    else
        print_status "WARNING" "Could not retrieve detailed diagnostics"
    fi
}

# Function to check Docker containers
check_docker_containers() {
    print_status "HEADER" "Docker Container Status:"
    
    if command -v docker &> /dev/null; then
        # List running containers
        local containers=$(docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -v "NAMES")
        
        if [ -n "$containers" ]; then
            echo "$containers" | while IFS=$'\t' read -r name status ports; do
                if [[ $status == *"Up"* ]]; then
                    print_status "SUCCESS" "Container '$name': $status"
                    if [ -n "$ports" ]; then
                        echo -e "  ${CYAN}Ports:${NC} $ports"
                    fi
                else
                    print_status "ERROR" "Container '$name': $status"
                fi
            done
        else
            print_status "WARNING" "No containers found"
        fi
    else
        print_status "WARNING" "Docker not available in current context"
    fi
}

# Function to test API endpoints
test_api_endpoints() {
    print_status "HEADER" "Testing API Endpoints:"
    
    # Test health endpoint
    local health_url="$BACKEND_URL/api/v1/health"
    if curl -s -f -m 5 "$health_url" > /dev/null 2>&1; then
        print_status "SUCCESS" "Health endpoint: $health_url"
    else
        print_status "ERROR" "Health endpoint unavailable: $health_url"
    fi
    
    # Test diagnostics endpoint
    local diag_url="$BACKEND_URL/api/diagnostics/quick"
    if curl -s -f -m 5 "$diag_url" > /dev/null 2>&1; then
        print_status "SUCCESS" "Quick diagnostics: $diag_url"
    else
        print_status "WARNING" "Quick diagnostics unavailable: $diag_url"
    fi
    
    # Test root endpoint
    local root_url="$BACKEND_URL/"
    if curl -s -f -m 5 "$root_url" > /dev/null 2>&1; then
        print_status "SUCCESS" "Root endpoint: $root_url"
    else
        print_status "WARNING" "Root endpoint unavailable: $root_url"
    fi
}

# Main diagnostic function
main() {
    echo ""
    print_status "HEADER" "🚀 STARTING SYSTEM DIAGNOSTICS"
    echo -e "${CYAN}Time: $(date)${NC}"
    echo ""
    
    # Check Docker containers first
    check_docker_containers
    echo ""
    
    # Wait a bit for services to fully initialize
    print_status "INFO" "Waiting 5 seconds for services to initialize..."
    sleep 5
    
    # Check basic service connectivity
    local backend_ok=0
    local frontend_ok=0
    
    if check_service "$BACKEND_URL/api/v1/health" "Backend API"; then
        backend_ok=1
    fi
    echo ""
    
    if check_service "$FRONTEND_URL" "Frontend"; then
        frontend_ok=1
    fi
    echo ""
    
    # Test API endpoints if backend is available
    if [ $backend_ok -eq 1 ]; then
        test_api_endpoints
        echo ""
        
        # Get detailed diagnostics
        get_diagnostics
    else
        print_status "ERROR" "Backend not available - skipping detailed diagnostics"
    fi
    
    # Summary
    echo ""
    print_status "HEADER" "🏁 DIAGNOSTICS SUMMARY"
    
    if [ $backend_ok -eq 1 ] && [ $frontend_ok -eq 1 ]; then
        print_status "SUCCESS" "All core services are operational"
        print_status "INFO" "Backend API: $BACKEND_URL"
        print_status "INFO" "Frontend: $FRONTEND_URL"
        print_status "INFO" "API Documentation: $BACKEND_URL/docs"
        echo ""
        print_status "SUCCESS" "🎉 System ready for use!"
    elif [ $backend_ok -eq 1 ]; then
        print_status "WARNING" "Backend operational, but frontend issues detected"
        print_status "INFO" "Backend API: $BACKEND_URL"
        print_status "INFO" "API Documentation: $BACKEND_URL/docs"
    elif [ $frontend_ok -eq 1 ]; then
        print_status "WARNING" "Frontend operational, but backend issues detected"
        print_status "INFO" "Frontend: $FRONTEND_URL"
    else
        print_status "ERROR" "Critical services are not responding"
        print_status "INFO" "Check Docker logs: docker compose logs"
    fi
    
    echo ""
}

# Run diagnostics
main "$@"
