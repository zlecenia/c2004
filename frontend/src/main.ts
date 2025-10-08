// frontend/src/main.ts
import './config/env.config'; // Validate environment on startup
import './config/service.manifest'; // Validate service manifest
import { moduleManager } from './modules';
import { IdentificationModule } from './modules/identification/identification.module';
import { IdentificationView } from './modules/identification/identification.view';

// Add basic CSS
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  .identification-container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .identification-container h2 {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .identification-form {
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }
  
  .identify-button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .identify-button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  .identify-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .result-container {
    min-height: 50px;
  }
  
  .success {
    background-color: #d4edda;
    color: #155724;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #c3e6cb;
  }
  
  .success h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .success p {
    margin: 5px 0;
  }
  
  .error {
    background-color: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #f5c6cb;
  }
`;
document.head.appendChild(style);

async function initializeApp() {
  try {
    console.log('🚀 Starting Identification Service...');
    
    // Initialize all modules
    await moduleManager.initializeAll();
    
    // Get identification module and create view
    const identificationModule = moduleManager.getModule<IdentificationModule>('identification');
    const identificationView = new IdentificationView(identificationModule);
    
    // Render the view
    const app = document.getElementById('app');
    if (app) {
      app.appendChild(identificationView.render());
    } else {
      document.body.appendChild(identificationView.render());
    }
    
    console.log('✅ Application initialized successfully');
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    
    // Show error in UI
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerHTML = `
      <h3>Application Failed to Start</h3>
      <p>${error}</p>
      <p>Check the console for more details.</p>
    `;
    
    const app = document.getElementById('app');
    if (app) {
      app.appendChild(errorDiv);
    } else {
      document.body.appendChild(errorDiv);
    }
  }
}

// Start the application
initializeApp();
