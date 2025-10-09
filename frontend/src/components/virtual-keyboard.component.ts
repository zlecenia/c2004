export interface VirtualKeyboardOptions {
  targetInputId: string;
  layout?: 'full' | 'numeric' | 'password';
  onKeyPress?: (key: string, value: string) => void;
  onEnter?: (value: string) => void;
  showSpecialKeys?: boolean;
}

interface KeyDefinition {
  value: string;
  display: string;
  class?: string;
  disabled?: boolean;
}

export class VirtualKeyboard {
  private container: HTMLElement;
  private targetInput: HTMLInputElement;
  private options: VirtualKeyboardOptions;

  constructor(containerId: string, options: VirtualKeyboardOptions) {
    this.container = document.getElementById(containerId) as HTMLElement;
    this.targetInput = document.getElementById(options.targetInputId) as HTMLInputElement;
    this.options = options;
    
    if (!this.container || !this.targetInput) {
      throw new Error('Container or target input not found');
    }

    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    const layout = this.getLayout();
    
    this.container.innerHTML = `
      <div class="virtual-keyboard-component">
        ${layout.map(row => `
          <div class="keyboard-row">
            ${row.map(key => `
              <button class="key ${key.class || ''}" data-key="${key.value}" ${key.disabled ? 'disabled' : ''}>
                ${key.display}
              </button>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;

    this.addStyles();
  }

  private getLayout(): KeyDefinition[][] {
    switch (this.options.layout) {
      case 'numeric':
        return [
          [
            { value: '1', display: '1' },
            { value: '2', display: '2' },
            { value: '3', display: '3' },
            { value: '4', display: '4' },
            { value: '5', display: '5' }
          ],
          [
            { value: '6', display: '6' },
            { value: '7', display: '7' },
            { value: '8', display: '8' },
            { value: '9', display: '9' },
            { value: '0', display: '0' }
          ],
          [
            { value: 'CLEAR', display: '🗑️', class: 'key-special' },
            { value: 'BACKSPACE', display: '⌫', class: 'key-special' },
            { value: 'ENTER', display: '↵', class: 'key-special key-wide' }
          ]
        ];
      
      case 'password':
        return [
          [
            { value: '1', display: '1' },
            { value: '2', display: '2' },
            { value: '3', display: '3' },
            { value: '4', display: '4' },
            { value: '5', display: '5' }
          ],
          [
            { value: '6', display: '6' },
            { value: '7', display: '7' },
            { value: '8', display: '8' },
            { value: '9', display: '9' },
            { value: '0', display: '0' }
          ],
          [
            { value: 'Q', display: 'Q' },
            { value: 'W', display: 'W' },
            { value: 'E', display: 'E' },
            { value: 'R', display: 'R' },
            { value: 'T', display: 'T' }
          ],
          [
            { value: 'Y', display: 'Y' },
            { value: 'U', display: 'U' },
            { value: 'I', display: 'I' },
            { value: 'O', display: 'O' },
            { value: 'P', display: 'P' }
          ],
          [
            { value: 'BACKSPACE', display: '⌫', class: 'key-special' },
            { value: 'CLEAR', display: '🗑️', class: 'key-special' },
            { value: 'CANCEL', display: '❌', class: 'key-special' }
          ]
        ];

      default: // 'full'
        return [
          [
            { value: '1', display: '1' },
            { value: '2', display: '2' },
            { value: '3', display: '3' },
            { value: '4', display: '4' },
            { value: '5', display: '5' },
            { value: '6', display: '6' },
            { value: '7', display: '7' },
            { value: '8', display: '8' },
            { value: '9', display: '9' },
            { value: '0', display: '0' }
          ],
          [
            { value: 'Q', display: 'Q' },
            { value: 'W', display: 'W' },
            { value: 'E', display: 'E' },
            { value: 'R', display: 'R' },
            { value: 'T', display: 'T' },
            { value: 'Y', display: 'Y' },
            { value: 'U', display: 'U' },
            { value: 'I', display: 'I' },
            { value: 'O', display: 'O' },
            { value: 'P', display: 'P' }
          ],
          [
            { value: 'A', display: 'A' },
            { value: 'S', display: 'S' },
            { value: 'D', display: 'D' },
            { value: 'F', display: 'F' },
            { value: 'G', display: 'G' },
            { value: 'H', display: 'H' },
            { value: 'J', display: 'J' },
            { value: 'K', display: 'K' },
            { value: 'L', display: 'L' },
            { value: 'CLEAR', display: '⌫', class: 'key-special' }
          ],
          [
            { value: 'Z', display: 'Z' },
            { value: 'X', display: 'X' },
            { value: 'C', display: 'C' },
            { value: 'V', display: 'V' },
            { value: 'B', display: 'B' },
            { value: 'N', display: 'N' },
            { value: 'M', display: 'M' },
            { value: '-', display: '-' },
            { value: 'ENTER', display: '↵ ENTER', class: 'key-wide' }
          ]
        ];
    }
  }

  private setupEventListeners(): void {
    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('key')) {
        const key = target.getAttribute('data-key');
        if (key) {
          this.handleKeyPress(key);
        }
      }
    });
  }

  private handleKeyPress(key: string): void {
    const currentValue = this.targetInput.value;

    switch (key) {
      case 'CLEAR':
        this.targetInput.value = '';
        break;
      case 'BACKSPACE':
        this.targetInput.value = currentValue.slice(0, -1);
        break;
      case 'CANCEL':
        // Cancel action - can be handled by parent
        if (this.options.onKeyPress) {
          this.options.onKeyPress(key, '');
        }
        break;
      case 'ENTER':
        if (this.options.onEnter) {
          this.options.onEnter(this.targetInput.value);
        }
        break;
      default:
        this.targetInput.value = currentValue + key;
        break;
    }

    // Trigger input event for other listeners
    this.targetInput.dispatchEvent(new Event('input', { bubbles: true }));

    // Custom callback
    if (this.options.onKeyPress) {
      this.options.onKeyPress(key, this.targetInput.value);
    }
  }

  private addStyles(): void {
    // Check if styles already exist
    if (document.getElementById('virtual-keyboard-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'virtual-keyboard-styles';
    style.textContent = `
      /* Virtual Keyboard Component */
      .virtual-keyboard-component {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        user-select: none;
        max-width: 600px;
        margin: 0 auto;
      }

      .keyboard-row {
        display: flex;
        justify-content: center;
        margin-bottom: 6px;
        gap: 4px;
      }

      .key {
        min-width: 45px;
        height: 40px;
        border: 1px solid #ccc;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.1s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .key:hover:not(:disabled) {
        background: #f0f0f0;
        transform: translateY(-1px);
        box-shadow: 0 3px 6px rgba(0,0,0,0.15);
      }

      .key:active:not(:disabled) {
        background: #e0e0e0;
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      }

      .key:disabled {
        background: #f8f9fa;
        color: #6c757d;
        cursor: not-allowed;
        opacity: 0.6;
      }

      .key-special {
        background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
        color: white;
        font-weight: 600;
      }

      .key-special:hover:not(:disabled) {
        background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
      }

      .key-wide {
        min-width: 90px;
      }

      /* Layout specific styles */
      .virtual-keyboard-component[data-layout="numeric"] .key {
        min-width: 50px;
        height: 45px;
        font-size: 14px;
      }

      .virtual-keyboard-component[data-layout="password"] .key {
        min-width: 40px;
        height: 35px;
        font-size: 11px;
      }

      /* Animation for key press */
      @keyframes keyPress {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
      }

      .key.pressed {
        animation: keyPress 0.1s ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }

  public destroy(): void {
    this.container.innerHTML = '';
  }

  public setValue(value: string): void {
    this.targetInput.value = value;
  }

  public getValue(): string {
    return this.targetInput.value;
  }

  public clear(): void {
    this.targetInput.value = '';
  }

  public focus(): void {
    this.targetInput.focus();
  }
}
