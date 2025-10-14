// frontend/src/main.ts
// Main application entry point - refactored to use core modules

import './config/env.config'; // Validate environment on startup
import './config/service.manifest'; // Validate service manifest
import './styles/app-shell.css'; // App shell styles
import './styles/old-modules.css'; // Styles for old module loaders
import { AppInitializer } from './core/app.initializer';

// Add minimal inline CSS for size modes (body level)
const style = document.createElement('style');
style.textContent = `
  /* Size modes */
  body.fixed-1200 {
    overflow: hidden;
  }
  body.fixed-1200 .main-app-container {
    width: 1200px;
    height: 400px;
  }
  body.responsive-100 {
    overflow: hidden;
  }
  body.responsive-100 .main-app-container {
    width: 100%;
    height: 100vh;
  }
  body.responsive-100 .app-layout {
    height: calc(100vh - 35px);
  }
`;
document.head.appendChild(style);

/**
 * Initialize and start the application
 */
async function initializeApp(): Promise<void> {
  try {
    console.log('🚀 Starting C2004 Connect System...');
    
    const app = new AppInitializer();
    await app.start();
    
    console.log('✅ Application started successfully');
  } catch (error) {
    console.error('❌ Application failed to start:', error);
    showErrorUI(error);
  }
}

/**
 * Show error UI when application fails to start
 */
function showErrorUI(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'app-error';
  errorDiv.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: #1a1a1a;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      text-align: center;
    ">
      <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
      <h2 style="margin: 0 0 12px 0; font-size: 24px; color: #dc3545;">Application Failed to Start</h2>
      <p style="margin: 0 0 20px 0; font-size: 16px; color: #999; max-width: 500px;">${message}</p>
      <p style="margin: 0; font-size: 14px; color: #666;">Check the console for more details.</p>
      <button onclick="window.location.reload()" style="
        margin-top: 24px;
        padding: 12px 24px;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      ">Reload Application</button>
    </div>
  `;
  
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '';
    app.appendChild(errorDiv);
  } else {
    document.body.innerHTML = '';
    document.body.appendChild(errorDiv);
  }
}

// Start the application
initializeApp();
