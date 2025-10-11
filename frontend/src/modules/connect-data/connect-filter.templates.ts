// frontend/src/modules/connect-data/connect-filter.templates.ts

import { IconComponent } from '../../components/icon.component';

export class ConnectFilterTemplates {
  
  static getMainLayoutTemplate(): string {
    return `
      <div class="main-content">
        <div class="content-body">
          ${this.getDataContents()}
        </div>
      </div>
    `;
  }

  private static getDataContents(): string {
    return `
      <!-- Users Data -->
      <div id="users-data" class="data-content active">
        ${this.getUsersContent()}
      </div>

      <!-- Devices Data -->
      <div id="devices-data" class="data-content">
        ${this.getDevicesContent()}
      </div>

      <!-- Tests Data -->
      <div id="tests-data" class="data-content">
        ${this.getTestsContent()}
      </div>

      <!-- Reports Data -->
      <div id="reports-data" class="data-content">
        ${this.getReportsContent()}
      </div>
    `;
  }

  private static getUsersContent(): string {
    return `
      <!-- Search Section -->
      <div id="users-search" class="content-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">👥 Wyszukiwanie użytkowników</h3>
            <p class="section-subtitle">Znajdź użytkowników systemu według różnych kryteriów</p>
          </div>
        </div>

        <form class="search-form">
          <div class="search-row">
            <div class="form-group">
              <label class="form-label">Imię i nazwisko:</label>
              <input type="text" class="form-control" placeholder="np. Jan Kowalski" id="user-name">
            </div>
            <div class="form-group">
              <label class="form-label">Rola:</label>
              <select class="form-control" id="user-role">
                <option value="">Wszystkie role</option>
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="technician">Technik</option>
                <option value="operator">Operator</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary" id="search-users">
              ${IconComponent.render('search', { size: 14 })}
              Szukaj
            </button>
          </div>

          <div class="search-row">
            <div class="form-group">
              <label class="form-label">Status:</label>
              <select class="form-control" id="user-status">
                <option value="">Wszystkie statusy</option>
                <option value="active">Aktywny</option>
                <option value="inactive">Nieaktywny</option>
                <option value="pending">Oczekujący</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Oddział:</label>
              <select class="form-control" id="user-department">
                <option value="">Wszystkie oddziały</option>
                <option value="production">Produkcja</option>
                <option value="maintenance">Konserwacja</option>
                <option value="quality">Jakość</option>
                <option value="logistics">Logistyka</option>
              </select>
            </div>
            <button type="button" class="btn btn-secondary" id="clear-search">
              ${IconComponent.render('x', { size: 14 })}
              Wyczyść
            </button>
          </div>
        </form>

        <div class="results-section">
          <div class="results-header">
            <h4>📋 Wyniki wyszukiwania</h4>
            <span class="results-count">Znaleziono: <strong id="users-count">0</strong> użytkowników</span>
          </div>

          <table class="results-table" id="users-table">
            <thead>
              <tr>
                <th>Imię i nazwisko</th>
                <th>Rola</th>
                <th>Oddział</th>
                <th>Status</th>
                <th>Ostatnia aktywność</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              ${this.getSampleUsersRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private static getDevicesContent(): string {
    return `
      <div id="devices-search" class="content-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">🔧 Wyszukiwanie urządzeń</h3>
            <p class="section-subtitle">Zarządzaj urządzeniami w systemie</p>
          </div>
        </div>

        <form class="search-form">
          <div class="search-row">
            <div class="form-group">
              <label class="form-label">Nazwa urządzenia:</label>
              <input type="text" class="form-control" placeholder="np. PSS-7000" id="device-name">
            </div>
            <div class="form-group">
              <label class="form-label">Numer seryjny:</label>
              <input type="text" class="form-control" placeholder="np. #12345" id="device-serial">
            </div>
            <button type="button" class="btn btn-primary">
              ${IconComponent.render('search', { size: 14 })}
              Szukaj
            </button>
          </div>
        </form>

        <div class="results-section">
          <table class="results-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Typ</th>
                <th>Numer seryjny</th>
                <th>Status</th>
                <th>Lokalizacja</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              ${this.getSampleDevicesRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private static getTestsContent(): string {
    return `
      <div id="tests-search" class="content-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">🧪 Historia testów</h3>
            <p class="section-subtitle">Przeglądaj wykonane testy i ich wyniki</p>
          </div>
        </div>

        <form class="search-form">
          <div class="search-row">
            <div class="form-group">
              <label class="form-label">Typ testu:</label>
              <select class="form-control">
                <option value="">Wszystkie typy</option>
                <option value="pressure">Test ciśnienia</option>
                <option value="flow">Test przepływu</option>
                <option value="calibration">Kalibracja</option>
                <option value="maintenance">Konserwacja</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Okres:</label>
              <select class="form-control">
                <option value="week">Ostatni tydzień</option>
                <option value="month">Ostatni miesiąc</option>
                <option value="quarter">Ostatni kwartał</option>
                <option value="year">Ostatni rok</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary">
              ${IconComponent.render('search', { size: 14 })}
              Szukaj
            </button>
          </div>
        </form>

        <div class="results-section">
          <table class="results-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Typ testu</th>
                <th>Urządzenie</th>
                <th>Operator</th>
                <th>Wynik</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              ${this.getSampleTestsRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private static getReportsContent(): string {
    return `
      <div id="reports-search" class="content-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">📊 Raporty systemowe</h3>
            <p class="section-subtitle">Generuj i przeglądaj raporty</p>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn btn-primary">
            ${IconComponent.render('plus', { size: 14 })}
            Nowy raport
          </button>
          <button class="btn btn-secondary">
            ${IconComponent.render('download', { size: 14 })}
            Eksportuj wszystkie
          </button>
        </div>

        <div class="results-section">
          <table class="results-table">
            <thead>
              <tr>
                <th>Typ raportu</th>
                <th>Data utworzenia</th>
                <th>Okres</th>
                <th>Status</th>
                <th>Rozmiar</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              ${this.getSampleReportsRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private static getSampleUsersRows(): string {
    const users = [
      { name: 'Jan Kowalski', role: 'Manager', department: 'Produkcja', status: 'active', activity: '2 min temu' },
      { name: 'Anna Nowak', role: 'Technik', department: 'Konserwacja', status: 'active', activity: '15 min temu' },
      { name: 'Piotr Wiśniewski', role: 'Operator', department: 'Jakość', status: 'inactive', activity: '2 dni temu' }
    ];

    return users.map(user => `
      <tr>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td>${user.department}</td>
        <td><span class="badge badge-${user.status}">${user.status === 'active' ? 'Aktywny' : 'Nieaktywny'}</span></td>
        <td>${user.activity}</td>
        <td>
          <button class="btn btn-sm btn-secondary">Edytuj</button>
          <button class="btn btn-sm btn-secondary">Szczegóły</button>
        </td>
      </tr>
    `).join('');
  }

  private static getSampleDevicesRows(): string {
    const devices = [
      { name: 'PSS-7000', type: 'Pressure Tester', serial: '#12345', status: 'active', location: 'Hala A' },
      { name: 'PSS-5000', type: 'Flow Tester', serial: '#67890', status: 'maintenance', location: 'Hala B' },
      { name: 'PSS-3000', type: 'Multi Tester', serial: '#11111', status: 'active', location: 'Hala C' }
    ];

    return devices.map(device => `
      <tr>
        <td>${device.name}</td>
        <td>${device.type}</td>
        <td>${device.serial}</td>
        <td><span class="badge badge-${device.status}">${device.status === 'active' ? 'Aktywny' : 'Konserwacja'}</span></td>
        <td>${device.location}</td>
        <td>
          <button class="btn btn-sm btn-secondary">Edytuj</button>
          <button class="btn btn-sm btn-secondary">Historia</button>
        </td>
      </tr>
    `).join('');
  }

  private static getSampleTestsRows(): string {
    const tests = [
      { date: '2024-10-11 10:30', type: 'Test ciśnienia', device: 'PSS-7000 #12345', operator: 'Jan Kowalski', result: 'Pozytywny' },
      { date: '2024-10-11 09:15', type: 'Kalibracja', device: 'PSS-5000 #67890', operator: 'Anna Nowak', result: 'Pozytywny' },
      { date: '2024-10-10 16:45', type: 'Test przepływu', device: 'PSS-3000 #11111', operator: 'Piotr Wiśniewski', result: 'Negatywny' }
    ];

    return tests.map(test => `
      <tr>
        <td>${test.date}</td>
        <td>${test.type}</td>
        <td>${test.device}</td>
        <td>${test.operator}</td>
        <td><span class="badge ${test.result === 'Pozytywny' ? 'badge-active' : 'badge-inactive'}">${test.result}</span></td>
        <td>
          <button class="btn btn-sm btn-secondary">Szczegóły</button>
          <button class="btn btn-sm btn-secondary">Raport</button>
        </td>
      </tr>
    `).join('');
  }

  private static getSampleReportsRows(): string {
    const reports = [
      { type: 'Raport miesięczny', date: '2024-10-01', period: 'Październik 2024', status: 'Gotowy', size: '2.1 MB' },
      { type: 'Analiza wydajności', date: '2024-10-08', period: 'Q3 2024', status: 'Przetwarzanie', size: '1.8 MB' },
      { type: 'Raport jakości', date: '2024-10-05', period: 'Wrzesień 2024', status: 'Gotowy', size: '945 KB' }
    ];

    return reports.map(report => `
      <tr>
        <td>${report.type}</td>
        <td>${report.date}</td>
        <td>${report.period}</td>
        <td><span class="badge ${report.status === 'Gotowy' ? 'badge-active' : 'badge-pending'}">${report.status}</span></td>
        <td>${report.size}</td>
        <td>
          <button class="btn btn-sm btn-secondary">Pobierz</button>
          <button class="btn btn-sm btn-secondary">Podgląd</button>
        </td>
      </tr>
    `).join('');
  }
}
