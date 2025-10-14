// frontend/src/utils/dom.helpers.ts

/**
 * Safe DOM manipulation utilities
 * Replaces innerHTML usage to prevent XSS vulnerabilities
 */

export interface ElementOptions {
  className?: string;
  id?: string;
  textContent?: string;
  attributes?: Record<string, string>;
}

/**
 * Create element safely without innerHTML
 */
export function createElement(tagName: string, options: ElementOptions = {}): HTMLElement {
  const element = document.createElement(tagName);
  
  if (options.className) {
    element.className = options.className;
  }
  
  if (options.id) {
    element.id = options.id;
  }
  
  if (options.textContent) {
    element.textContent = options.textContent;
  }
  
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  
  return element;
}

/**
 * Clear container and add elements safely
 */
export function replaceContent(container: HTMLElement, ...elements: (HTMLElement | string)[]): void {
  // Clear existing content
  container.textContent = '';
  
  // Add new elements
  elements.forEach(element => {
    if (typeof element === 'string') {
      const textNode = document.createTextNode(element);
      container.appendChild(textNode);
    } else {
      container.appendChild(element);
    }
  });
}

/**
 * Create error container safely
 */
export function createErrorContainer(message: string, actions?: Array<{text: string, onclick: () => void}>): HTMLElement {
  const container = createElement('div', { className: 'error-container' });
  
  const icon = createElement('div', { className: 'error-icon', textContent: '⚠️' });
  const content = createElement('div', { className: 'error-content' });
  
  const title = createElement('h3', { textContent: 'Error' });
  const messageEl = createElement('p', { className: 'error-message', textContent: message });
  
  content.appendChild(title);
  content.appendChild(messageEl);
  
  if (actions && actions.length > 0) {
    const actionsContainer = createElement('div', { className: 'error-actions' });
    
    actions.forEach(action => {
      const button = createElement('button', { textContent: action.text }) as HTMLButtonElement;
      button.onclick = action.onclick;
      actionsContainer.appendChild(button);
    });
    
    content.appendChild(actionsContainer);
  }
  
  container.appendChild(icon);
  container.appendChild(content);
  
  return container;
}

/**
 * Create loading container safely
 */
export function createLoadingContainer(message: string = 'Loading...'): HTMLElement {
  const container = createElement('div', { className: 'loading-container' });
  
  const spinner = createElement('div', { className: 'loading-spinner' });
  const text = createElement('div', { className: 'loading-text', textContent: message });
  const progress = createElement('div', { className: 'loading-progress' });
  const progressFill = createElement('div', { className: 'progress-fill' });
  
  progress.appendChild(progressFill);
  container.appendChild(spinner);
  container.appendChild(text);
  container.appendChild(progress);
  
  return container;
}

/**
 * Create main app structure safely
 */
export function createMainAppStructure(): HTMLElement {
  const mainContainer = createElement('div', { className: 'main-app-container' });
  
  // Top bar
  const topBar = createElement('div', { className: 'top-bar' });
  const brand = createElement('div', { className: 'top-bar-brand', textContent: '🚀 ConnectDisplay' });
  const submenu = createElement('div', { className: 'top-bar-submenu', id: 'top-bar-submenu' });
  const sectionTitle = createElement('div', { className: 'top-bar-section-title', id: 'top-bar-section-title' });
  
  // Status section
  const status = createElement('div', { className: 'top-bar-status' });
  const moduleCountSpan = createElement('span');
  moduleCountSpan.appendChild(document.createTextNode('📊 '));
  const moduleCount = createElement('span', { id: 'module-count', textContent: '6' });
  moduleCountSpan.appendChild(moduleCount);
  
  const statusIcon = createElement('span', { textContent: '✅' });
  
  const timeSpan = createElement('span');
  timeSpan.appendChild(document.createTextNode('🕒 '));
  const loadTime = createElement('span', { id: 'load-time', textContent: new Date().toLocaleTimeString() });
  timeSpan.appendChild(loadTime);
  
  status.appendChild(moduleCountSpan);
  status.appendChild(statusIcon);
  status.appendChild(timeSpan);
  
  topBar.appendChild(brand);
  topBar.appendChild(submenu);
  topBar.appendChild(sectionTitle);
  topBar.appendChild(status);
  
  // Content area
  const contentArea = createElement('div', { className: 'content-area', id: 'content-area' });
  
  mainContainer.appendChild(topBar);
  mainContainer.appendChild(contentArea);
  
  return mainContainer;
}

/**
 * Sanitize text content (basic XSS prevention)
 */
export function sanitizeText(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.textContent || '';
}

/**
 * Create button element safely
 */
export function createButton(text: string, className: string = '', onclick?: () => void): HTMLButtonElement {
  const button = createElement('button', { 
    className: className,
    textContent: text 
  }) as HTMLButtonElement;
  
  if (onclick) {
    button.onclick = onclick;
  }
  
  return button;
}
