// frontend/src/modules/connect-test/connect-test.view.ts - Refactored version
import { ConnectTestModule } from './connect-test.module';
import { ConnectTestTemplates } from './connect-test.templates';
import { ConnectTestStyles } from './connect-test.styles';
import { TestIntervalsComponent } from './test-intervals.component';

export class ConnectTestView {
  private currentSection: string = 'identification';
  private currentMethod: string = 'list';
  private currentScenarioType: string = 'usage';
  private currentTestType: string = '';
  private testIntervalsComponent: TestIntervalsComponent;

  constructor(_module: ConnectTestModule) {
    // module parameter used for future implementations
    this.testIntervalsComponent = new TestIntervalsComponent();
  }

  private updateNavigationURL(): void {
    console.log(`🔧 ConnectTest: Updating URL - section: ${this.currentSection}, method: ${this.currentMethod}, testType: ${this.currentTestType}`);
    
    // Build URL based on current navigation state
    let url = `connect-test`;
    
    if (this.currentSection === 'testing') {
      url += `/${this.currentSection}`;
      if (this.currentScenarioType) {
        url += `/${this.currentScenarioType}`;
      }
    } else {
      url += `/${this.currentSection}`;
      if (this.currentMethod) {
        url += `/${this.currentMethod}`;
      }
      // For identification section, also include test type if search method is selected
      if (this.currentSection === 'identification' && this.currentMethod === 'search' && this.currentTestType) {
        url += `/${this.currentTestType}`;
      }
    }
    
    // Update URL hash (proper SPA routing)
    window.location.hash = `#/${url}`;
    console.log(`🔧 ConnectTest: Updated URL to: ${window.location.hash}`);
    
    console.log(`🔗 Navigation URL updated: ${url}`);
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-test-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🧪 Test Module';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectTest - Urządzenia';
    
    // Use template system
    container.innerHTML = ConnectTestTemplates.getMainLayoutTemplate();
    
    // Template moved to connect-test.templates.ts with emoji icons
    
    this.addStyles();
    this.setupEventListeners(container);
    return container;
  }

  private addStyles(): void {
    // Check if styles already added
    if (document.getElementById('connect-test-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'connect-test-styles';
    style.textContent = ConnectTestStyles.getStyles();
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Section buttons (identification/testing)
    const sectionButtons = container.querySelectorAll('.section-button');
    sectionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');
        this.handleSectionChange(section || 'identification');
      });
    });

    // Method buttons  
    const methodButtons = container.querySelectorAll('.method-item');
    methodButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const method = target.getAttribute('data-method');
        this.handleMethodChange(method || 'list');
      });
    });
  }

  private handleSectionChange(section: string): void {
    this.currentSection = section;
    this.updateActiveStates();
    this.updateContent();
    this.updateNavigationURL();
  }

  private handleMethodChange(method: string): void {
    this.currentMethod = method;
    this.updateActiveStates();
    this.updateContent();
    this.updateNavigationURL();
  }

  private updateActiveStates(): void {
    // Update section buttons
    const sectionButtons = document.querySelectorAll('.section-button');
    sectionButtons.forEach(button => {
      button.classList.toggle('active', button.getAttribute('data-section') === this.currentSection);
    });

    // Update method buttons
    const methodButtons = document.querySelectorAll('.method-item');
    methodButtons.forEach(button => {
      button.classList.toggle('active', button.getAttribute('data-method') === this.currentMethod);
    });
  }

  private updateContent(): void {
    // Content updated based on current section and method
    console.log(`ConnectTest: ${this.currentSection} - ${this.currentMethod}`);
  }
}
