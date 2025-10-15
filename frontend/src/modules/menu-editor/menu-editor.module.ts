// frontend/src/modules/menu-editor/menu-editor.module.ts

import { Module, ModuleMetadata } from '../module.interface';

export class MenuEditorModule implements Module {
  metadata: ModuleMetadata = {
    name: 'menu-editor',
    version: '1.0.0',
    dependencies: []
  };

  private element: HTMLElement | null = null;

  getName(): string {
    return 'menu-editor';
  }

  getDisplayName(): string {
    return '🎨 Menu Editor';
  }

  async initialize(): Promise<void> {
    console.log('🎨 MenuEditor Module initialized');
  }

  render(container: HTMLElement): void {
    // Dynamic import to avoid bundling issues
    import('./menu-editor.view').then(({ MenuEditorView }) => {
      const view = new MenuEditorView(this);
      const element = view.render();
      
      container.innerHTML = '';
      container.appendChild(element);
      
      this.element = element;
    }).catch(error => {
      console.error('Failed to load MenuEditor view:', error);
      container.innerHTML = `<div class="error">Failed to load MenuEditor view: ${error.message}</div>`;
    });
  }

  async destroy(): Promise<void> {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
