#!/bin/bash
# scripts/port-manager.sh - Advanced port and service management

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

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
        "DETAIL") echo -e "${CYAN}🔸 $message${NC}" ;;
    esac
}

# Load environment variables
load_env() {
    if [ -f .env ]; then
        source .env
        print_status "INFO" "Environment loaded from .env"
    else
        print_status "WARNING" ".env file not found, using defaults"
    fi
}

# Get project ports from env or defaults (no Redis for simple app)
get_project_ports() {
    echo "${FRONTEND_PORT:-8100} ${BACKEND_PORT:-8101} ${DEV_FRONTEND_PORT:-3000} ${TRAEFIK_PORT:-80} ${TRAEFIK_DASHBOARD_PORT:-8080} ${VITE_DEV_PORT:-5173} ${DOCS_PORT:-8102} ${METRICS_PORT:-8103} ${DEBUG_PORT:-5678}"
}

# Check which ports are in use
check_ports() {
    print_status "HEADER" "Checking project ports status"
    local ports=$(get_project_ports)
    
    for port in $ports; do
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [ -n "$pid" ]; then
            local process_info=$(ps -p $pid -o comm= 2>/dev/null || echo "unknown")
            print_status "WARNING" "Port $port is in use (PID: $pid, Process: $process_info)"
        else
            print_status "SUCCESS" "Port $port is free"
        fi
    done
}

# Kill processes on project ports
kill_port_processes() {
    print_status "HEADER" "Stopping processes on project ports"
    local ports=$(get_project_ports)
    local killed_count=0
    
    for port in $ports; do
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [ -n "$pid" ]; then
            local process_info=$(ps -p $pid -o comm= 2>/dev/null || echo "unknown")
            print_status "DETAIL" "Killing process on port $port (PID: $pid, Process: $process_info)"
            
            # Try graceful shutdown first
            kill -TERM $pid 2>/dev/null
            sleep 1
            
            # Check if process still exists
            if kill -0 $pid 2>/dev/null; then
                print_status "WARNING" "Forcing kill of stubborn process $pid"
                kill -9 $pid 2>/dev/null
            fi
            
            killed_count=$((killed_count + 1))
        fi
    done
    
    if [ $killed_count -gt 0 ]; then
        print_status "SUCCESS" "Stopped $killed_count processes"
    else
        print_status "INFO" "No processes found on project ports"
    fi
}

# Stop Docker services
stop_docker_services() {
    print_status "HEADER" "Stopping Docker services"
    
    # Stop compose services
    if [ -f docker-compose.yml ]; then
        docker compose down 2>/dev/null || docker-compose down 2>/dev/null || print_status "INFO" "No compose services running"
    fi
    
    # Stop individual containers (no Redis for simple app)
    local containers="identification-frontend identification-backend identification-traefik"
    for container in $containers; do
        if docker ps -q -f name=$container | grep -q .; then
            print_status "DETAIL" "Stopping container: $container"
            docker stop $container 2>/dev/null || print_status "WARNING" "Could not stop $container"
        fi
    done
    
    # Remove containers
    for container in $containers; do
        if docker ps -aq -f name=$container | grep -q .; then
            print_status "DETAIL" "Removing container: $container"
            docker rm $container 2>/dev/null || print_status "WARNING" "Could not remove $container"
        fi
    done
    
    print_status "SUCCESS" "Docker services stopped"
}

# Stop Python processes
stop_python_processes() {
    print_status "HEADER" "Stopping Python processes"
    local killed_count=0
    
    # Define process patterns to look for
    local patterns=(
        "uvicorn.*identification"
        "fastapi.*identification"
        "python.*app.main"
        "python.*backend"
        "gunicorn.*identification"
    )
    
    for pattern in "${patterns[@]}"; do
        local pids=$(pgrep -f "$pattern" 2>/dev/null)
        if [ -n "$pids" ]; then
            for pid in $pids; do
                local process_info=$(ps -p $pid -o args= 2>/dev/null || echo "unknown")
                print_status "DETAIL" "Stopping Python process: $pid ($process_info)"
                kill -TERM $pid 2>/dev/null
                killed_count=$((killed_count + 1))
            done
        fi
    done
    
    # Wait a moment for graceful shutdown
    sleep 2
    
    # Force kill if needed
    for pattern in "${patterns[@]}"; do
        local pids=$(pgrep -f "$pattern" 2>/dev/null)
        if [ -n "$pids" ]; then
            for pid in $pids; do
                print_status "WARNING" "Force killing stubborn Python process: $pid"
                kill -9 $pid 2>/dev/null
            done
        fi
    done
    
    if [ $killed_count -gt 0 ]; then
        print_status "SUCCESS" "Stopped $killed_count Python processes"
    else
        print_status "INFO" "No Python processes found"
    fi
}

# Clean up project resources
cleanup_resources() {
    print_status "HEADER" "Cleaning up project resources"
    
    # Clean Docker networks
    local network="identification-network"
    if docker network ls | grep -q $network; then
        print_status "DETAIL" "Removing Docker network: $network"
        docker network rm $network 2>/dev/null || print_status "WARNING" "Could not remove network $network"
    fi
    
    # Clean up temporary files
    if [ -d /tmp/identification-* ]; then
        print_status "DETAIL" "Cleaning temporary files"
        rm -rf /tmp/identification-* 2>/dev/null || print_status "WARNING" "Could not clean temp files"
    fi
    
    print_status "SUCCESS" "Resources cleaned up"
}

# Main stop function
stop_all() {
    print_status "HEADER" "🚀 STOPPING ALL PROJECT SERVICES"
    echo -e "${CYAN}Time: $(date)${NC}"
    echo ""
    
    load_env
    
    stop_docker_services
    echo ""
    
    kill_port_processes
    echo ""
    
    stop_python_processes
    echo ""
    
    cleanup_resources
    echo ""
    
    print_status "HEADER" "🏁 ALL SERVICES STOPPED"
    print_status "SUCCESS" "Project completely shut down"
    echo ""
}

# Show running services
show_status() {
    print_status "HEADER" "Project Services Status"
    echo ""
    
    load_env
    
    # Docker containers
    print_status "INFO" "Docker Containers:"
    docker ps --filter "name=identification" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || print_status "WARNING" "Docker not accessible"
    echo ""
    
    # Port usage
    check_ports
    echo ""
    
    # Python processes
    print_status "INFO" "Python Processes:"
    pgrep -f "uvicorn\|fastapi\|python.*backend" -l 2>/dev/null || print_status "INFO" "No Python processes found"
    echo ""
}

# Parse command line arguments
case "${1:-stop}" in
    "stop"|"stop-all")
        stop_all
        ;;
    "check"|"status")
        show_status
        ;;
    "ports")
        load_env
        check_ports
        ;;
    "docker")
        stop_docker_services
        ;;
    "python") 
        stop_python_processes
        ;;
    "clean")
        cleanup_resources
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  stop, stop-all    Stop all project services (default)"
        echo "  check, status     Show status of all services"
        echo "  ports            Check port usage"
        echo "  docker           Stop only Docker services"
        echo "  python           Stop only Python processes"
        echo "  clean            Clean up resources"
        echo "  help             Show this help"
        ;;
    *)
        print_status "ERROR" "Unknown command: $1"
        print_status "INFO" "Use '$0 help' for available commands"
        exit 1
        ;;
esac
