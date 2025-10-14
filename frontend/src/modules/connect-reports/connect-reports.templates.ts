// frontend/src/modules/connect-reports/connect-reports.templates.ts

import { IconComponent } from '../../components/icon.component';

export class ConnectReportsTemplates {
  
  static getMainLayoutTemplate(): string {
    return `
      <div class="reports-layout">
        <!-- Column 1: Report Types -->
        <div class="menu-column">
          <h3 class="column-title">Raporty</h3>
          <button class="menu-item active" data-report="executed">
            <span class="menu-icon">${IconComponent.render('check-circle', { size: 18 })}</span>
            <span class="menu-label">Wykonane</span>
          </button>
          <button class="menu-item" data-report="pending">
            <span class="menu-icon">${IconComponent.render('clock', { size: 18 })}</span>
            <span class="menu-label">Oczekujące</span>
          </button>
          <button class="menu-item" data-report="overdue">
            <span class="menu-icon">${IconComponent.render('alert-triangle', { size: 18 })}</span>
            <span class="menu-label">Przetermin.</span>
          </button>
          <button class="menu-item" data-report="statistics">
            <span class="menu-icon">${IconComponent.render('bar-chart', { size: 18 })}</span>
            <span class="menu-label">Statystyki</span>
          </button>
        </div>

        <!-- Column 2: View Options -->
        <div class="menu-column">
          <h3 class="column-title">Widok</h3>
          <button class="menu-item active" data-view="week">
            <span class="menu-icon">${IconComponent.render('calendar', { size: 18 })}</span>
            <span class="menu-label">Tydzień</span>
          </button>
          <button class="menu-item" data-view="month">
            <span class="menu-icon">${IconComponent.render('calendar', { size: 18 })}</span>
            <span class="menu-label">Miesiąc</span>
          </button>
          <button class="menu-item" data-view="list">
            <span class="menu-icon">${IconComponent.render('list', { size: 18 })}</span>
            <span class="menu-label">Lista</span>
          </button>
          <button class="menu-item" data-view="chart">
            <span class="menu-icon">${IconComponent.render('pie-chart', { size: 18 })}</span>
            <span class="menu-label">Wykres</span>
          </button>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-container">
            <div class="content-header">
              <h2 class="content-title">📊 Raporty - Wykonane zadania</h2>
              <div class="view-toggles">
                <button class="toggle-btn active" data-period="week">Tydzień</button>
                <button class="toggle-btn" data-period="month">Miesiąc</button>
                <button class="toggle-btn" data-period="quarter">Kwartał</button>
              </div>
            </div>

            ${this.getReportContents()}
          </div>
        </div>
      </div>
    `;
  }

  private static getReportContents(): string {
    return `
      <div class="reports-content">
        <!-- Executed Reports Section -->
        <div id="executed-section" class="report-section active">
          ${this.getExecutedReportsContent()}
        </div>

        <!-- Pending Reports Section -->
        <div id="pending-section" class="report-section">
          ${this.getPendingReportsContent()}
        </div>

        <!-- Overdue Reports Section -->
        <div id="overdue-section" class="report-section">
          ${this.getOverdueReportsContent()}
        </div>

        <!-- Statistics Section -->
        <div id="statistics-section" class="report-section">
          ${this.getStatisticsContent()}
        </div>
      </div>
    `;
  }

  private static getExecutedReportsContent(): string {
    return `
      <!-- Statistics Panel -->
      <div class="stats-panel">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">127</div>
            <div class="stat-label">Wykonane dzisiaj</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">845</div>
            <div class="stat-label">Ten tydzień</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">3,421</div>
            <div class="stat-label">Ten miesiąc</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">98.5%</div>
            <div class="stat-label">Skuteczność</div>
          </div>
        </div>
      </div>

      <!-- Calendar Navigation -->
      <div class="calendar-nav">
        <button class="nav-btn" id="prev-period">‹ Poprzedni</button>
        <div class="nav-title" id="current-period">Październik 2024</div>
        <button class="nav-btn" id="next-period">Następny ›</button>
      </div>

      <!-- Calendar Grid -->
      <div class="calendar-grid">
        <div class="calendar-header">
          <div class="header-cell">Pon</div>
          <div class="header-cell">Wto</div>
          <div class="header-cell">Śro</div>
          <div class="header-cell">Czw</div>
          <div class="header-cell">Pią</div>
          <div class="header-cell">Sob</div>
          <div class="header-cell">Nie</div>
        </div>
        <div class="calendar-body" id="calendar-body">
          <!-- Calendar days will be generated dynamically -->
        </div>
      </div>
    `;
  }

  private static getPendingReportsContent(): string {
    return `
      <div class="stats-panel">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">23</div>
            <div class="stat-label">Oczekuje dzisiaj</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">156</div>
            <div class="stat-label">Ten tydzień</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">78</div>
            <div class="stat-label">Priorytetowe</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">2.1</div>
            <div class="stat-label">Śr. czas oczek.</div>
          </div>
        </div>
      </div>

      <div class="pending-list">
        <h3>📋 Najbliższe zadania</h3>
        <div class="task-list">
          <div class="task-item-row">
            <div class="task-priority high">🔴</div>
            <div class="task-info">
              <div class="task-title">Przegląd PSS-7000 #12345</div>
              <div class="task-details">Za 2 godziny • Jan Kowalski</div>
            </div>
          </div>
          <div class="task-item-row">
            <div class="task-priority medium">🟡</div>
            <div class="task-info">
              <div class="task-title">Kalibracja PSS-5000 #67890</div>
              <div class="task-details">Jutro 09:00 • Anna Nowak</div>
            </div>
          </div>
          <div class="task-item-row">
            <div class="task-priority low">🟢</div>
            <div class="task-info">
              <div class="task-title">Konserwacja PSS-3000 #11111</div>
              <div class="task-details">Poniedziałek • Piotr Wiśniewski</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private static getOverdueReportsContent(): string {
    return `
      <div class="stats-panel">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">7</div>
            <div class="stat-label">Przeterminowane</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">3</div>
            <div class="stat-label">Krytyczne</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1.2</div>
            <div class="stat-label">Śr. opóźnienie</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">2</div>
            <div class="stat-label">Wymagają akcji</div>
          </div>
        </div>
      </div>

      <div class="overdue-list">
        <h3>⚠️ Przeterminowane zadania</h3>
        <div class="overdue-items">
          <div class="overdue-item critical">
            <div class="overdue-badge">🔴 KRYTYCZNE</div>
            <div class="overdue-info">
              <div class="overdue-title">Naprawa PSS-2000 #99999</div>
              <div class="overdue-details">Przeterminowane o 3 dni • Tomasz Nowicki</div>
              <div class="overdue-reason">Brak części zamiennych</div>
            </div>
            <div class="overdue-actions">
              <button class="btn-action">📞 Kontakt</button>
              <button class="btn-action">📝 Raport</button>
            </div>
          </div>
          
          <div class="overdue-item medium">
            <div class="overdue-badge">🟡 WYSOKIE</div>
            <div class="overdue-info">
              <div class="overdue-title">Test PSS-1500 #88888</div>
              <div class="overdue-details">Przeterminowane o 1 dzień • Anna Kowalska</div>
              <div class="overdue-reason">Niedostępność klienta</div>
            </div>
            <div class="overdue-actions">
              <button class="btn-action">📞 Kontakt</button>
              <button class="btn-action">📅 Przełóż</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private static getStatisticsContent(): string {
    return `
      <div class="statistics-dashboard">
        <div class="stats-overview">
          <div class="overview-card">
            <h3>📊 Podsumowanie miesiąca</h3>
            <div class="overview-metrics">
              <div class="metric">
                <span class="metric-value">3,421</span>
                <span class="metric-label">Wykonane zadania</span>
              </div>
              <div class="metric">
                <span class="metric-value">98.5%</span>
                <span class="metric-label">Skuteczność</span>
              </div>
              <div class="metric">
                <span class="metric-value">1.2h</span>
                <span class="metric-label">Śr. czas wykonania</span>
              </div>
            </div>
          </div>

          <div class="overview-card">
            <h3>📈 Trendy</h3>
            <div class="trend-indicators">
              <div class="trend-item">
                <span class="trend-label">Wydajność</span>
                <span class="trend-value positive">+12% ↗</span>
              </div>
              <div class="trend-item">
                <span class="trend-label">Czas reakcji</span>
                <span class="trend-value positive">-8% ↗</span>
              </div>
              <div class="trend-item">
                <span class="trend-label">Jakość</span>
                <span class="trend-value positive">+5% ↗</span>
              </div>
            </div>
          </div>
        </div>

        <div class="charts-section">
          <div class="chart-card">
            <h3>📊 Wykonane zadania - ostatnie 30 dni</h3>
            <div class="chart-placeholder">
              <div class="chart-bars">
                ${this.generateChartBars()}
              </div>
            </div>
          </div>

          <div class="chart-card">
            <h3>🏷️ Kategorie zadań</h3>
            <div class="category-stats">
              <div class="category-item">
                <span class="category-label">🔧 Naprawy</span>
                <div class="category-bar">
                  <div class="category-fill"></div>
                </div>
                <span class="category-value">45%</span>
              </div>
              <div class="category-item">
                <span class="category-label">⚙️ Konserwacja</span>
                <div class="category-bar">
                  <div class="category-fill"></div>
                </div>
                <span class="category-value">30%</span>
              </div>
              <div class="category-item">
                <span class="category-label">🔍 Przeglądy</span>
                <div class="category-bar">
                  <div class="category-fill"></div>
                </div>
                <span class="category-value">25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private static generateChartBars(): string {
    const values = [85, 92, 78, 96, 88, 91, 95, 87, 93, 89, 97, 84, 90, 86, 94];
    return values.map((value, index) => 
      `<div class="chart-bar" title="Dzień ${index + 1}: ${value}%"></div>`
    ).join('');
  }
}
