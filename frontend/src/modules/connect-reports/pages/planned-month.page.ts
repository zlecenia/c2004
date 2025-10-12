// frontend/src/modules/connect-reports/pages/planned-month.page.ts
export class PlannedMonthPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📅 Raporty Zaplanowane - Miesiąc</h2>
          <p>Przegląd raportów zaplanowanych na miesiąc</p>
        </div>
        
        <div class="month-navigation">
          <button class="btn-nav">⬅️ Poprzedni miesiąc</button>
          <div class="month-info">
            <strong>Październik 2025</strong>
          </div>
          <button class="btn-nav">Następny miesiąc ➡️</button>
        </div>
        
        <div class="month-calendar">
          <div class="calendar-header">
            <div>Pn</div><div>Wt</div><div>Śr</div><div>Czw</div><div>Pt</div><div>Sb</div><div>Nd</div>
          </div>
          <div class="calendar-grid">
            <div class="calendar-day">1<div class="day-badge">3</div></div>
            <div class="calendar-day">2<div class="day-badge">2</div></div>
            <div class="calendar-day">3<div class="day-badge">5</div></div>
            <div class="calendar-day">4<div class="day-badge">1</div></div>
            <div class="calendar-day">5</div>
            <div class="calendar-day">6</div>
            <div class="calendar-day">7<div class="day-badge">4</div></div>
            <div class="calendar-day">8<div class="day-badge">2</div></div>
            <div class="calendar-day today">11<div class="day-badge">6</div></div>
          </div>
        </div>
        
        <div class="planned-list">
          <h3>📋 Zaplanowane na dzisiaj (11.10.2025)</h3>
          <div class="planned-item">
            <div class="planned-time">09:00</div>
            <div class="planned-details">
              <div class="planned-title">🔧 Konserwacja #789</div>
              <div class="planned-meta">Serwis | PSS-7000</div>
            </div>
            <button class="btn-action">▶️ Rozpocznij</button>
          </div>
          <div class="planned-item">
            <div class="planned-time">14:00</div>
            <div class="planned-details">
              <div class="planned-title">📊 Raport dzienny</div>
              <div class="planned-meta">Raport | System</div>
            </div>
            <button class="btn-action">▶️ Rozpocznij</button>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 1000px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .month-navigation { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: white; border-radius: 8px; margin-bottom: 20px; }
      .month-info strong { font-size: 20px; }
      .btn-nav { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .month-calendar { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
      .calendar-header { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; margin-bottom: 10px; text-align: center; font-weight: 600; }
      .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
      .calendar-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 6px; position: relative; cursor: pointer; font-weight: 600; }
      .calendar-day:hover { background: #e9ecef; }
      .calendar-day.today { background: #007bff; color: white; }
      .day-badge { position: absolute; top: 5px; right: 5px; background: #28a745; color: white; font-size: 10px; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
      .planned-list { background: white; padding: 20px; border-radius: 8px; }
      .planned-list h3 { margin: 0 0 15px 0; }
      .planned-item { display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 6px; margin-bottom: 10px; }
      .planned-time { font-size: 18px; font-weight: 600; min-width: 60px; }
      .planned-details { flex: 1; }
      .planned-title { font-weight: 600; margin-bottom: 5px; }
      .planned-meta { font-size: 12px; color: #666; }
      .btn-action { padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    `;
  }
}
