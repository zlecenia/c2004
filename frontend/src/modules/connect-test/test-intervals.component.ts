export class TestIntervalsComponent {

  render(): string {
    return `
      <!-- Test Intervals Column -->
      <div class="menu-column" id="test-types-column" style="display: none;">
        <h3 class="column-title">Rodzaj testu</h3>
        <button class="test-type-item compact" data-test-type="usage">
          <span class="menu-icon">🔄</span>
          <span class="menu-label">Po użyciu</span>
        </button>
        <button class="test-type-item compact" data-test-type="monthly">
          <span class="menu-icon">📅</span>
          <span class="menu-label">Po miesiącu</span>
        </button>
        <button class="test-type-item compact" data-test-type="6months">
          <span class="menu-icon">📆</span>
          <span class="menu-label">Po 6 miesiącach</span>
        </button>
        <button class="test-type-item compact" data-test-type="yearly">
          <span class="menu-icon">🗓️</span>
          <span class="menu-label">Roczny</span>
        </button>

      </div>
    `;
  }

  getStyles(): string {
    return `
      /* Test Type Items - Compact */
      .test-type-item.compact { 
        width: 100%; 
        padding: 2px 4px; 
        background: #3a3a3a; 
        border: none; 
        color: #ccc; 
        cursor: pointer; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        gap: 2px; 
        border-radius: 3px; 
        margin-bottom: 2px; 
        transition: all 0.2s; 
        min-height: 32px;
      }
      .test-type-item.compact:hover { background: #4a4a4a; color: white; }
      .test-type-item.compact.active { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; }
      .test-type-item.compact .menu-icon { font-size: 14px; }
      .test-type-item.compact .menu-label { font-size: 9px; font-weight: 600; text-align: center; line-height: 1.1; }
    `;
  }

  setupEventListeners(container: HTMLElement, switchTestTypeCallback: Function): void {
    const testTypeItems = container.querySelectorAll('[data-test-type]');
    testTypeItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const testType = target.getAttribute('data-test-type');
        if (testType) switchTestTypeCallback(testType, container);
      });
    });
  }

  show(): void {
    const column = document.querySelector('#test-types-column') as HTMLElement;
    if (column) column.style.display = 'block';
  }

  hide(): void {
    const column = document.querySelector('#test-types-column') as HTMLElement;
    if (column) column.style.display = 'none';
  }

  setActive(testType: string): void {
    const container = document.querySelector('.connect-test-compact');
    if (!container) return;

    container.querySelectorAll('[data-test-type]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-test-type') === testType) {
        item.classList.add('active');
      }
    });
  }

  getTestTypeTitles(): Record<string, string> {
    return {
      'usage': 'Po użyciu',
      'monthly': 'Po miesiącu',
      '6months': 'Po 6 miesiącach',
      'yearly': 'Roczny',
      'emergency': 'Awaryjny',
      'preventive': 'Prewencyjny'
    };
  }
}
