// frontend/src/modules/connect-reports/pages/executed-month.page.ts
export class ExecutedMonthPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>✅ Raporty Wykonane - Miesiąc</h2>
          <p>Przegląd raportów wykonanych w październiku 2025</p>
        </div>
        
        <div class="month-navigation">
          <button class="btn-nav">⬅️ Wrzesień</button>
          <h3>Październik 2025</h3>
          <button class="btn-nav">Listopad ➡️</button>
        </div>
        
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-value">147</div>
            <div class="stat-label">Wykonane raporty</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-value">92%</div>
            <div class="stat-label">Terminowość</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-value">4.2h</div>
            <div class="stat-label">Śr. czas realizacji</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-value">12</div>
            <div class="stat-label">Wykonawcy</div>
          </div>
        </div>
        
        <div class="calendar-grid">
          <div class="calendar-header">Pn</div>
          <div class="calendar-header">Wt</div>
          <div class="calendar-header">Śr</div>
          <div class="calendar-header">Czw</div>
          <div class="calendar-header">Pt</div>
          <div class="calendar-header weekend">Sob</div>
          <div class="calendar-header weekend">Ndz</div>
          
          <div class="calendar-day empty"></div>
          <div class="calendar-day">1<span class="day-count">5</span></div>
          <div class="calendar-day">2<span class="day-count">8</span></div>
          <div class="calendar-day">3<span class="day-count">6</span></div>
          <div class="calendar-day">4<span class="day-count">12</span></div>
          <div class="calendar-day weekend">5<span class="day-count">2</span></div>
          <div class="calendar-day weekend">6<span class="day-count">1</span></div>
          
          <div class="calendar-day">7<span class="day-count">9</span></div>
          <div class="calendar-day">8<span class="day-count">11</span></div>
          <div class="calendar-day">9<span class="day-count">7</span></div>
          <div class="calendar-day">10<span class="day-count">10</span></div>
          <div class="calendar-day today">11<span class="day-count">4</span></div>
          <div class="calendar-day weekend">12</div>
          <div class="calendar-day weekend">13</div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; }
      .page-header h2 { color: #333; font-size: 20px; margin-bottom: 5px; }
      .month-navigation { display: flex; justify-content: space-between; align-items: center; margin: 20px 0; }
      .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
      .stat-card { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .stat-icon { font-size: 32px; margin-bottom: 10px; }
      .stat-value { font-size: 28px; font-weight: 700; color: #333; }
      .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
      .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; background: white; padding: 20px; border-radius: 8px; }
      .calendar-header { font-weight: 600; padding: 10px; text-align: center; }
      .calendar-day { background: #f8f9fa; padding: 15px; border-radius: 6px; min-height: 60px; position: relative; cursor: pointer; }
      .calendar-day.today { background: #007bff; color: white; font-weight: 700; }
      .calendar-day.weekend { background: #e9ecef; }
      .calendar-day.empty { background: transparent; }
      .day-count { position: absolute; top: 5px; right: 8px; background: #28a745; color: white; font-size: 10px; padding: 2px 6px; border-radius: 10px; }
    `;
  }
}
