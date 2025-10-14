// frontend/src/modules/connect-reports/pages/executed-year.page.ts
export class ExecutedYearPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>✅ Raporty Wykonane - Rok</h2>
          <p>Podsumowanie raportów wykonanych w roku</p>
        </div>
        
        <div class="year-navigation">
          <button class="btn-nav">⬅️ Poprzedni rok</button>
          <div class="year-info">
            <strong>Rok 2025</strong>
          </div>
          <button class="btn-nav">Następny rok ➡️</button>
        </div>
        
        <div class="year-summary">
          <div class="summary-card">
            <div class="summary-value">1,247</div>
            <div class="summary-label">📋 Wszystkie raporty</div>
          </div>
          <div class="summary-card success">
            <div class="summary-value">1,198</div>
            <div class="summary-label">✅ Wykonane</div>
          </div>
          <div class="summary-card warning">
            <div class="summary-value">49</div>
            <div class="summary-label">⚠️ Opóźnione</div>
          </div>
          <div class="summary-card">
            <div class="summary-value">96.1%</div>
            <div class="summary-label">📊 Skuteczność</div>
          </div>
        </div>
        
        <div class="months-grid">
          <div class="month-card">
            <div class="month-name">Styczeń</div>
            <div class="month-stats">
              <div class="stat">✅ 98 wykonanych</div>
              <div class="stat">📊 94% skuteczność</div>
            </div>
            <button class="btn-details">Szczegóły</button>
          </div>
          
          <div class="month-card">
            <div class="month-name">Luty</div>
            <div class="month-stats">
              <div class="stat">✅ 89 wykonanych</div>
              <div class="stat">📊 91% skuteczność</div>
            </div>
            <button class="btn-details">Szczegóły</button>
          </div>
          
          <div class="month-card">
            <div class="month-name">Marzec</div>
            <div class="month-stats">
              <div class="stat">✅ 102 wykonanych</div>
              <div class="stat">📊 97% skuteczność</div>
            </div>
            <button class="btn-details">Szczegóły</button>
          </div>
          
          <div class="month-card">
            <div class="month-name">Kwiecień</div>
            <div class="month-stats">
              <div class="stat">✅ 95 wykonanych</div>
              <div class="stat">📊 95% skuteczność</div>
            </div>
            <button class="btn-details">Szczegóły</button>
          </div>
          
          <div class="month-card">
            <div class="month-name">Maj</div>
            <div class="month-stats">
              <div class="stat">✅ 104 wykonanych</div>
              <div class="stat">📊 98% skuteczność</div>
            </div>
            <button class="btn-details">Szczegóły</button>
          </div>
          
          <div class="month-card">
            <div class="month-name">Czerwiec</div>
            <div class="month-stats">
              <div class="stat">✅ 91 wykonanych</div>
              <div class="stat">📊 93% skuteczność</div>
            </div>
            <button class="btn-details">Szczegóły</button>
          </div>
        </div>
        
        <div class="year-chart">
          <h3>📈 Wykres roczny</h3>
          <div class="chart-placeholder">
            <p>Wykres trendu wykonanych raportów w ciągu roku</p>
            <div class="chart-bars">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 1200px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .year-navigation { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: white; border-radius: 8px; margin-bottom: 20px; }
      .year-info { text-align: center; }
      .year-info strong { font-size: 20px; display: block; }
      .btn-nav { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .year-summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px; }
      .summary-card { background: white; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #007bff; }
      .summary-card.success { border-left-color: #28a745; }
      .summary-card.warning { border-left-color: #ffc107; }
      .summary-value { font-size: 32px; font-weight: 700; color: #333; }
      .summary-label { font-size: 13px; color: #666; margin-top: 5px; }
      .months-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
      .month-card { background: white; padding: 20px; border-radius: 8px; }
      .month-name { font-size: 18px; font-weight: 600; margin-bottom: 10px; }
      .month-stats { margin-bottom: 15px; }
      .stat { font-size: 13px; color: #666; margin-bottom: 5px; }
      .btn-details { width: 100%; padding: 8px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .year-chart { background: white; padding: 20px; border-radius: 8px; }
      .year-chart h3 { margin: 0 0 15px 0; }
      .chart-placeholder { text-align: center; padding: 20px; }
      .chart-bars { display: flex; gap: 10px; justify-content: center; align-items: flex-end; margin-top: 20px; }
      .bar { width: 40px; background: #007bff; border-radius: 4px 4px 0 0; }
    `;
  }
}
