// frontend/src/modules/connect-workshop/connect-workshop.templates.ts

import { IconComponent } from '../../components/icon.component';

export class ConnectWorkshopTemplates {
  
  static getMainLayoutTemplate(): string {
    return `
      <div class="compact-layout">
        <!-- Column 1: Objects -->
        <div class="menu-column">
          <h3 class="column-title">Obiekty</h3>
          <button class="section-item active" data-section="requests">
            <span class="menu-icon">${IconComponent.render('clipboard-check', { size: 18 })}</span>
            <span class="menu-label">Zgłoszenia</span>
          </button>
          <button class="section-item" data-section="services">
            <span class="menu-icon">${IconComponent.render('settings', { size: 18 })}</span>
            <span class="menu-label">Serwisy</span>
          </button>
          <button class="section-item" data-section="transport">
            <span class="menu-icon">${IconComponent.render('wrench', { size: 18 })}</span>
            <span class="menu-label">Transport</span>
          </button>
          <button class="section-item" data-section="dispositions">
            <span class="menu-icon">${IconComponent.render('hard-drive', { size: 18 })}</span>
            <span class="menu-label">Dyspozycje</span>
          </button>
        </div>

        <!-- Column 2: Actions -->
        <div class="menu-column">
          <h3 class="column-title">Akcje</h3>
          <button class="menu-item active" data-action="search">
            <span class="menu-icon">${IconComponent.render('search', { size: 18 })}</span>
            <span class="menu-label">Szukaj</span>
          </button>
  
          <button class="menu-item" data-action="new-request">
            <span class="menu-icon">${IconComponent.render('plus', { size: 18 })}</span>
            <span class="menu-label">Dodaj</span>
          </button>
          <button class="menu-item" data-action="export">
            <span class="menu-icon">${IconComponent.render('bar-chart', { size: 18 })}</span>
            <span class="menu-label">Export</span>
          </button>
          <button class="menu-item" data-action="import">
            <span class="menu-icon">${IconComponent.render('download', { size: 18 })}</span>
            <span class="menu-label">Import</span>
          </button>
          <button class="menu-item" data-action="sync">
            <span class="menu-icon">${IconComponent.render('refresh', { size: 18 })}</span>
            <span class="menu-label">Sync</span>
          </button>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            ${this.getActionContents()}
          </div>
        </div>
      </div>
    `;
  }

  private static getActionContents(): string {
    return `
      <!-- Search Action Content -->
      <div id="search-content" class="action-content active">
        ${this.getSearchContent()}
      </div>

      <!-- New Request Action Content -->
      <div id="new-request-content" class="action-content">
        ${this.getNewRequestContent()}
      </div>

      <!-- Export Action Content -->
      <div id="export-content" class="action-content">
        ${this.getExportContent()}
      </div>

      <!-- Import Action Content -->
      <div id="import-content" class="action-content">
        ${this.getImportContent()}
      </div>

      <!-- Sync Action Content -->
      <div id="sync-content" class="action-content">
        ${this.getSyncContent()}
      </div>
    `;
  }

  private static getSearchContent(): string {
    return `
      <div class="search-workshop-layout">
        <!-- Left Sidebar with Filters -->
        <div class="search-sidebar">
          <div class="search-input-row">
            <input type="text" id="workshop-search-input" class="search-input" placeholder="Szukaj w zgłoszeniach...">
            <button id="workshop-search-btn" class="btn-search">🔍</button>
          </div>
          
          <div class="search-filters">
            <div class="filter-group">
              <label class="filter-label">Status zgłoszenia:</label>
              <select class="filter-select">
                <option>📋 Wszystkie zgłoszenia</option>
                <option>⏳ Oczekujące</option>
                <option>⚙️ W trakcie</option>
                <option>✅ Zakończone</option>
                <option>❌ Odrzucone</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Okres czasowy:</label>
              <select class="filter-select">
                <option>📅 Ostatni tydzień</option>
                <option>📆 Ostatni miesiąc</option>
                <option>🗓️ Ostatnie 3 miesiące</option>
                <option>📅 Cały rok</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Priorytet:</label>
              <select class="filter-select">
                <option>🔥 Wszystkie priorytety</option>
                <option>🔴 Wysoki</option>
                <option>🟡 Średni</option>
                <option>🟢 Niski</option>
              </select>
            </div>
            
            <div class="filter-actions">
              <button class="btn-filter-apply">✅ Zastosuj</button>
              <button class="btn-filter-clear">🗑️ Wyczyść</button>
            </div>
          </div>
        </div>

        <!-- Main Results Area -->
        <div class="search-results">
          <div class="results-header">
            <h3>📋 Rezultaty wyszukiwania</h3>
            <span class="results-count">Znaleziono: 0 zgłoszeń</span>
          </div>
          
          <div class="results-content">
            <div class="no-results-message">
              <div class="no-results-icon">🔍</div>
              <h4>Wprowadź kryteria wyszukiwania</h4>
              <p>Użyj filtrów po lewej stronie lub wprowadź tekst w pole wyszukiwania</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private static getNewRequestContent(): string {
    return `
      <div class="data-section">
        <div class="section-header">
          <h3 class="section-title">📝 Nowe zgłoszenie serwisowe</h3>
          <p class="section-subtitle">Utwórz nowe zgłoszenie do systemu warsztatowego</p>
        </div>

        <form id="new-request-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Typ zgłoszenia:</label>
              <select class="form-control" id="request-type">
                <option>🔧 Naprawa urządzenia</option>
                <option>⚙️ Konserwacja planowa</option>
                <option>🔍 Przegląd techniczny</option>
                <option>📊 Kalibracja</option>
                <option>🚚 Transport</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Priorytet:</label>
              <select class="form-control" id="request-priority">
                <option>🔴 Wysokie</option>
                <option selected>🟡 Standardowe</option>
                <option>🟢 Niskie</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Opis problemu:</label>
            <textarea class="form-control" id="request-description" rows="4" 
                      placeholder="Opisz szczegółowo problem lub typ wykonywanej usługi..."></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Klient:</label>
              <input type="text" class="form-control" id="request-client" placeholder="Nazwa klienta">
            </div>
            
            <div class="form-group">
              <label class="form-label">Lokalizacja:</label>
              <input type="text" class="form-control" id="request-location" placeholder="Adres/lokalizacja">
            </div>
          </div>

          <div class="action-buttons">
            <button type="submit" class="btn btn-primary">
              ${IconComponent.render('check', { size: 14 })}
              Utwórz zgłoszenie
            </button>
            <button type="button" class="btn btn-secondary">
              ${IconComponent.render('x', { size: 14 })}
              Anuluj
            </button>
          </div>
        </form>
      </div>
    `;
  }

  private static getExportContent(): string {
    return `
      <div class="data-section">
        <div class="section-header">
          <h3 class="section-title">📊 Eksport danych</h3>
          <p class="section-subtitle">Eksportuj dane z systemu warsztatowego</p>
        </div>

        <div class="export-options">
          <div class="form-group">
            <label class="form-label">Format eksportu:</label>
            <select class="form-control" id="export-format">
              <option>📄 Excel (XLSX)</option>
              <option>📊 CSV</option>
              <option>📋 PDF</option>
              <option>💾 JSON</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Zakres danych:</label>
            <select class="form-control" id="export-range">
              <option>📅 Ostatni tydzień</option>
              <option>📆 Ostatni miesiąc</option>
              <option>🗓️ Ostatnie 3 miesiące</option>
              <option>📅 Cały rok</option>
              <option>🎯 Zakres niestandardowy</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Typ danych:</label>
            <div class="checkbox-group">
              <label><input type="checkbox" checked> 📋 Zgłoszenia serwisowe</label>
              <label><input type="checkbox" checked> ⚙️ Harmonogramy serwisów</label>
              <label><input type="checkbox"> 🚚 Dane transportowe</label>
              <label><input type="checkbox"> 📦 Dyspozycje</label>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn btn-primary" id="start-export-btn">
              ${IconComponent.render('download', { size: 14 })}
              Rozpocznij eksport
            </button>
            <button class="btn btn-secondary">
              ${IconComponent.render('settings', { size: 14 })}
              Zaawansowane opcje
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private static getImportContent(): string {
    return `
      <div class="data-section">
        <div class="section-header">
          <h3 class="section-title">📥 Import danych</h3>
          <p class="section-subtitle">Importuj dane do systemu warsztatowego</p>
        </div>

        <div class="import-options">
          <div class="form-group">
            <label class="form-label">Typ importu:</label>
            <select class="form-control" id="import-type">
              <option>📋 Zgłoszenia z Fleet Manager</option>
              <option>🔧 Dane serwisowe</option>
              <option>⚙️ Harmonogram serwisów</option>
              <option>📊 Raporty serwisowe</option>
              <option>🚚 Plan transportu</option>
              <option>📦 Lista przesyłek</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Plik do importu:</label>
            <input type="file" class="form-control" id="import-file" accept=".xlsx,.csv,.json">
            <small class="form-text">Obsługiwane formaty: Excel, CSV, JSON</small>
          </div>

          <div class="form-group">
            <label class="form-label">Opcje importu:</label>
            <div class="checkbox-group">
              <label><input type="checkbox" checked> 🔄 Aktualizuj istniejące rekordy</label>
              <label><input type="checkbox"> 📧 Wyślij powiadomienia</label>
              <label><input type="checkbox"> 🔍 Waliduj dane przed importem</label>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn btn-primary" id="start-import-btn">
              ${IconComponent.render('upload', { size: 14 })}
              Rozpocznij import
            </button>
            <button class="btn btn-secondary">
              ${IconComponent.render('file-text', { size: 14 })}
              Pobierz szablon
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private static getSyncContent(): string {
    return `
      <div class="data-section">
        <div class="section-header">
          <h3 class="section-title">🔄 Synchronizacja</h3>
          <p class="section-subtitle">Synchronizuj dane z zewnętrznymi systemami</p>
        </div>

        <div class="sync-status">
          <div class="sync-item">
            <div class="sync-info">
              <h4>🚛 Fleet Manager</h4>
              <p>Ostatnia synchronizacja: <span class="sync-time">2 godziny temu</span></p>
            </div>
            <div class="sync-actions">
              <span class="badge badge-active">Aktywne</span>
              <button class="btn btn-primary btn-sm">Synchronizuj</button>
            </div>
          </div>

          <div class="sync-item">
            <div class="sync-info">
              <h4>⚙️ System Serwisowy</h4>
              <p>Ostatnia synchronizacja: <span class="sync-time">30 minut temu</span></p>
            </div>
            <div class="sync-actions">
              <span class="badge badge-active">Aktywne</span>
              <button class="btn btn-primary btn-sm">Synchronizuj</button>
            </div>
          </div>

          <div class="sync-item">
            <div class="sync-info">
              <h4>📦 System WMS</h4>
              <p>Ostatnia synchronizacja: <span class="sync-time">1 dzień temu</span></p>
            </div>
            <div class="sync-actions">
              <span class="badge badge-pending">Oczekuje</span>
              <button class="btn btn-warning btn-sm">Synchronizuj</button>
            </div>
          </div>
        </div>

        <div class="sync-options">
          <h4>Opcje synchronizacji:</h4>
          <div class="checkbox-group">
            <label><input type="checkbox" checked> 🔄 Automatyczna synchronizacja</label>
            <label><input type="checkbox" checked> 📧 Powiadomienia o błędach</label>
            <label><input type="checkbox"> 📊 Szczegółowe logi</label>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn btn-success" id="sync-all-btn">
            ${IconComponent.render('refresh', { size: 14 })}
            Synchronizuj wszystkie
          </button>
          <button class="btn btn-secondary">
            ${IconComponent.render('settings', { size: 14 })}
            Ustawienia sync
          </button>
        </div>
      </div>
    `;
  }
}
