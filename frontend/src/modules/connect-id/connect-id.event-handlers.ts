// frontend/src/modules/connect-id/connect-id.event-handlers.ts - Event Handlers
import { VirtualKeyboard } from '../../components/virtual-keyboard.component';

export class ConnectIdEventHandlers {
  private manualKeyboard: VirtualKeyboard | null = null;
  private eventListenersSetup: boolean = false;

  constructor(
    private getCurrentMethod: () => string,
    private setCurrentMethod: (method: string) => void,
    private showNotification: (message: string, type: string) => void
  ) {}

  setupEventListeners(container: HTMLElement): void {
    // Prevent duplicate event listeners
    if (this.eventListenersSetup) {
      return;
    }


    // Method buttons
    this.setupMethodButtons(container);

    // User list handling
    this.setupUserListHandlers(container);

    // Manual input
    this.setupManualInputHandlers(container);

    // Main keyboard for login
    this.setupMainKeyboard(container);

    this.eventListenersSetup = true;
  }

  private setupMethodButtons(container: HTMLElement): void {
    const methodButtons = container.querySelectorAll('.method-item');
    methodButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const method = target.getAttribute('data-method');
        if (method) {
          this.switchMethod(method, container);
        }
      });
    });
  }

  private setupUserListHandlers(container: HTMLElement): void {
    const userItems = container.querySelectorAll('.user-menu-item');
    userItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        
        // Remove previous selections
        container.querySelectorAll('.user-menu-item').forEach(userItem => {
          userItem.classList.remove('selected');
        });
        
        // Select current
        target.classList.add('selected');
        
        // Get user data
        const userId = target.getAttribute('data-user');
        const fullName = target.getAttribute('data-fullname');
        const roleElement = target.querySelector('.user-role');
        const role = roleElement ? roleElement.textContent : '';
        
        
        // Update login form
        this.showUserLoginForm(container, fullName || '', role || '');
      });
    });
  }

  private setupManualInputHandlers(container: HTMLElement): void {
    // Manual input submit
    const manualSubmit = container.querySelector('#manual-submit');
    const manualInput = container.querySelector('#manual-input') as HTMLInputElement;
    
    if (manualSubmit && manualInput) {
      manualSubmit.addEventListener('click', () => {
        this.handleManualSubmit(container);
      });
      
      manualInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleManualSubmit(container);
        }
      });
    }

    // Virtual keyboard for manual input
    this.setupVirtualKeyboard(container);
  }

  private setupVirtualKeyboard(container: HTMLElement): void {
    // Delay keyboard setup to ensure DOM is fully rendered
    setTimeout(() => {
      const keyboardContainer = container.querySelector('#virtual-keyboard-manual');
      if (keyboardContainer && !this.manualKeyboard) {
        const manualInput = container.querySelector('#manual-input') as HTMLInputElement;
        if (manualInput) {
          try {
            this.manualKeyboard = new VirtualKeyboard('virtual-keyboard-manual', {
              targetInputId: 'manual-input',
              layout: 'full',
              showSpecialKeys: true
            });
          } catch (error) {
            console.warn('VirtualKeyboard setup failed:', error);
          }
        }
      }
    }, 100);
  }

  private setupMainKeyboard(container: HTMLElement): void {
    const passwordInput = container.querySelector('#password-input') as HTMLInputElement;
    const submitBtn = container.querySelector('#password-submit') as HTMLButtonElement;

    // Setup virtual keyboard for password input with delay
    setTimeout(() => {
      const keyboardContainer = container.querySelector('#virtual-keyboard');
      if (keyboardContainer && passwordInput) {
        try {
          new VirtualKeyboard('virtual-keyboard', {
            targetInputId: 'password-input',
            layout: 'password',
            showSpecialKeys: true,
            onEnter: () => this.handleMainLogin(container)
          });
        } catch (error) {
          console.warn('Main VirtualKeyboard setup failed:', error);
        }
      }
    }, 100);

    // Submit button
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.handleMainLogin(container);
      });
    }

    // Enter key on input
    if (passwordInput) {
      passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleMainLogin(container);
        }
      });
    }
  }

  private switchMethod(method: string, container: HTMLElement, updateURL: boolean = true): void {
    this.setCurrentMethod(method);

    // Update active method button
    container.querySelectorAll('.method-item').forEach(btn => {
      btn.classList.remove('active');
    });
    
    const activeBtn = container.querySelector(`[data-method="${method}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    // Hide all content sections
    container.querySelectorAll('.content-section').forEach(section => {
      (section as HTMLElement).style.display = 'none';
    });

    // Show/hide users column based on method and type
    const usersColumn = container.querySelector('#users-column') as HTMLElement;
    if (method === 'list') {
      usersColumn.style.display = 'block';
      // Show list content
      const listContent = container.querySelector('#list-content') as HTMLElement;
      if (listContent) {
        listContent.style.display = 'block';
      }
    } else {
      usersColumn.style.display = 'none';
      // Show method-specific content
      const methodContent = container.querySelector(`#${method}-content`) as HTMLElement;
      if (methodContent) {
        methodContent.style.display = 'block';
      }
    }

    // Handle virtual keyboard for manual input
    if (method === 'manual') {
      this.setupVirtualKeyboard(container);
    }

    // Update URL without page reload
    if (updateURL && typeof window !== 'undefined') {
      const currentPath = window.location.pathname.split('/').slice(0, -1).join('/');
      const newPath = `${currentPath}/${method}`;
      window.history.replaceState({}, '', newPath);
    }
  }

  private showUserLoginForm(container: HTMLElement, fullName: string, role: string): void {
    // Hide all content sections
    container.querySelectorAll('.content-section').forEach(section => {
      (section as HTMLElement).style.display = 'none';
    });
    
    // Show login form
    const loginContent = container.querySelector('#user-login-content') as HTMLElement;
    if (loginContent) {
      loginContent.style.display = 'block';
      
      // Update user info
      const userNameSpan = loginContent.querySelector('#selected-user-name');
      const userRoleSpan = loginContent.querySelector('#selected-user-role');
      
      if (userNameSpan) userNameSpan.textContent = fullName;
      if (userRoleSpan) userRoleSpan.textContent = role;
      
      // Focus password input
      const passwordInput = loginContent.querySelector('#password-input') as HTMLInputElement;
      if (passwordInput) {
        passwordInput.focus();
        passwordInput.value = ''; // Clear previous input
      }
    }
  }

  private handleManualSubmit(container: HTMLElement): void {
    const manualInput = container.querySelector('#manual-input') as HTMLInputElement;
    if (!manualInput) return;
    
    const inputValue = manualInput.value.trim();
    if (inputValue) {
      this.showNotification(`✅ Zidentyfikowano: ${inputValue}`, 'success');
      manualInput.value = '';
    } else {
      this.showNotification(`❌ Wprowadź kod`, 'error');
    }
  }

  private handleMainLogin(container: HTMLElement): void {
    const passwordInput = container.querySelector('#password-input') as HTMLInputElement;
    const selectedUser = container.querySelector('.user-menu-item.selected');
    
    if (!passwordInput || !selectedUser) return;
    
    const password = passwordInput.value.trim();
    const userId = selectedUser.getAttribute('data-user');
    const fullName = selectedUser.getAttribute('data-fullname');
    
    if (password) {
      
      // Simulate login success
      this.showNotification(`✅ Zalogowano jako: ${fullName}`, 'success');
      
      // Hide login form and return to current method
      const activeMethodContent = container.querySelector(`#${this.getCurrentMethod()}-content`) as HTMLElement;
      if (activeMethodContent) {
        // Hide login form
        const loginContent = container.querySelector('#user-login-content') as HTMLElement;
        if (loginContent) {
          loginContent.style.display = 'none';
        }
        
        // Show active method content
        activeMethodContent.style.display = 'block';
      }
      
      // Clear selection
      container.querySelectorAll('.user-menu-item').forEach(item => {
        item.classList.remove('selected');
      });
      
      // Clear password
      passwordInput.value = '';
      
    } else {
      this.showNotification(`❌ Wprowadź hasło`, 'error');
    }
  }


  // Method to switch to external method (called from outside)
  switchToMethod(method: string, container: HTMLElement): void {
    this.switchMethod(method, container, false);
  }
}
