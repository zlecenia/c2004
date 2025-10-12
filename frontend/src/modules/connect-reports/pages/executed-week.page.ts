// frontend/src/modules/connect-reports/pages/executed-week.page.ts
export class ExecutedWeekPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>✅ Raporty Wykonane - Tydzień</h2>
          <p>Przegląd raportów wykonanych w bieżącym tygodniu</p>
        </div>
        
        <div class="week-navigation">
          <button class="btn-nav">⬅️ Poprzedni tydzień</button>
          <div class="week-info">
            <strong>Tydzień 41/2025</strong>
            <span>2025-10-06 - 2025-10-12</span>
          </div>
          <button class="btn-nav">Następny tydzień ➡️</button>
        </div>
        
        <div class="week-grid">
          <div class="day-column">
            <div class="day-header">Pon 07.10</div>
            <div class="report-card">
              <div class="report-time">08:30</div>
              <div class="report-title">🔧 Konserwacja #123</div>
              <div class="report-status success">✅ Wykonane</div>
            </div>
            <div class="report-card">
              <div class="report-time">14:00</div>
              <div class="report-title">📊 Raport dzienny</div>
              <div class="report-status success">✅ Wykonane</div>
            </div>
          </div>
          
          <div class="day-column">
            <div class="day-header">Wt 08.10</div>
            <div class="report-card">
              <div class="report-time">09:00</div>
              <div class="report-title">⚙️ Serwis RFID</div>
              <div class="report-status success">✅ Wykonane</div>
            </div>
          </div>
          
          <div class="day-column">
            <div class="day-header">Śr 09.10</div>
            <div class="report-card">
              <div class="report-time">10:30</div>
              <div class="report-title">🚚 Transport #456</div>
              <div class="report-status success">✅ Wykonane</div>
            </div>
          </div>
          
          <div class="day-column">
            <div class="day-header">Czw 10.10</div>
            <div class="report-card">
              <div class="report-time">11:00</div>
              <div class="report-title">📋 Inwentaryzacja</div>
              <div class="report-status success">✅ Wykonane</div>
            </div>
          </div>
          
          <div class="day-column">
            <div class="day-header today">Pt 11.10</div>
            <div class="report-card">
              <div class="report-time">12:00</div>
              <div class="report-title">🔍 Kontrola jakości</div>
              <div class="report-status success">✅ Wykonane</div>
            </div>
          </div>
          
          <div class="day-column weekend">
            <div class="day-header">Sob 12.10</div>
          </div>
          
          <div class="day-column weekend">
            <div class="day-header">Ndz 13.10</div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; height: 100%; }
      .page-header h2 { color: #333; font-size: 20px; margin-bottom: 5px; }
      .week-navigation { display: flex; justify-content: space-between; align-items: center; margin: 20px 0; padding: 15px; background: white; border-radius: 8px; }
      .btn-nav { padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; }
      .week-info { display: flex; flex-direction: column; align-items: center; gap: 5px; }
      .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
      .day-column { background: white; border-radius: 8px; padding: 10px; min-height: 200px; }
      .day-column.weekend { background: #f8f9fa; }
      .day-header { font-weight: 600; padding: 8px; text-align: center; background: #f8f9fa; border-radius: 6px; margin-bottom: 10px; }
      .day-header.today { background: #007bff; color: white; }
      .report-card { background: #f8f9fa; padding: 10px; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid #28a745; }
      .report-time { font-size: 12px; color: #666; font-weight: 600; }
      .report-title { font-size: 13px; margin: 5px 0; }
      .report-status { font-size: 11px; color: #28a745; }
    `;
  }
}
