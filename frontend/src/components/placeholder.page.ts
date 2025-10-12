// frontend/src/components/placeholder.page.ts
export class PlaceholderPage {
  
  static getContent(section: string, method: string): string {
    return `
      <div class="placeholder-page">
        <div class="placeholder-icon">🚧</div>
        <h2 class="placeholder-title">Strona w budowie</h2>
        <p class="placeholder-description">
          Kombinacja <strong>${section}</strong> + <strong>${method}</strong> 
          jest obecnie w fazie implementacji.
        </p>
        <div class="placeholder-info">
          <p>Ta funkcjonalność zostanie dodana w najbliższych aktualizacjach.</p>
          <p class="placeholder-hint">💡 Wybierz inną opcję z menu aby kontynuować.</p>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .placeholder-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        padding: 40px;
        text-align: center;
        background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
        border-radius: 12px;
        margin: 20px;
      }

      .placeholder-icon {
        font-size: 80px;
        margin-bottom: 20px;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.8;
        }
      }

      .placeholder-title {
        font-size: 28px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 16px 0;
      }

      .placeholder-description {
        font-size: 16px;
        color: #6c757d;
        margin: 0 0 24px 0;
        max-width: 500px;
      }

      .placeholder-description strong {
        color: #667eea;
        font-weight: 600;
      }

      .placeholder-info {
        background: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
      }

      .placeholder-info p {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: #495057;
        line-height: 1.6;
      }

      .placeholder-info p:last-child {
        margin: 0;
      }

      .placeholder-hint {
        padding-top: 12px;
        border-top: 1px solid #e9ecef;
        font-weight: 500;
        color: #667eea !important;
      }
    `;
  }
}
