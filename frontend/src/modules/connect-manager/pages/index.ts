// frontend/src/modules/connect-manager/pages/index.ts
import { ScenariosPage } from './scenarios.page';
import { ActivitiesPage } from './activities.page';
import { TestTypesPage } from './test-types.page';

export class ConnectManagerPageManager {
  private container: HTMLElement | null = null;
  private currentPage: string = 'scenarios';
  private stylesAdded: boolean = false;

  initialize(container: HTMLElement): void {
    this.container = container;
    this.addStyles();
  }

  loadPage(page: string): void {
    if (!this.container) return;

    this.currentPage = page;
    let content = '';

    switch(page) {
      case 'scenarios':
        content = ScenariosPage.getContent();
        this.container.innerHTML = content;
        // Attach event listeners after content is loaded
        setTimeout(() => ScenariosPage.attachEventListeners(), 0);
        break;
      case 'activities':
        content = ActivitiesPage.getContent();
        this.container.innerHTML = content;
        break;
      case 'test-types':
        content = TestTypesPage.getContent();
        this.container.innerHTML = content;
        break;
      default:
        content = `
          <div class="page-content">
            <div class="page-not-found">
              <h2>❌ Strona nie znaleziona</h2>
              <p>Sekcja "${page}" nie istnieje</p>
            </div>
          </div>
        `;
        this.container.innerHTML = content;
    }
  }

  private addStyles(): void {
    if (this.stylesAdded) return;

    const styles = document.createElement('style');
    styles.id = 'connect-manager-page-styles';
    styles.textContent = `
      ${ScenariosPage.getStyles()}
      ${ActivitiesPage.getStyles()}
      ${TestTypesPage.getStyles()}
      
      /* Common styles */
      .page-not-found {
        padding: 40px;
        text-align: center;
      }
      
      .page-not-found h2 {
        color: #dc3545;
        margin-bottom: 10px;
      }
      
      /* Drag and drop styles */
      .drag-over {
        background: #e7f3ff !important;
        border-color: #007bff !important;
      }
      
      .draggable {
        cursor: move;
      }
      
      .dragging {
        opacity: 0.5;
      }
    `;

    document.head.appendChild(styles);
    this.stylesAdded = true;
  }

  getCurrentPage(): string {
    return this.currentPage;
  }

  refresh(): void {
    this.loadPage(this.currentPage);
  }
}

export { ScenariosPage, ActivitiesPage, TestTypesPage };
