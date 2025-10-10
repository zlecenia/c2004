// frontend/src/modules/connect-workshop/connect-workshop.template.ts
import { IconComponent } from '../../components/icon.component';

export class ConnectWorkshopTemplate {
  
  static render(): string {
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
          ${this.renderActionButtons()}
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-header">
            <h2 id="section-title">Zgłoszenia warsztatowe</h2>
            <div class="content-actions">
              <button class="btn-action" id="btn-refresh">
                ${IconComponent.render('refresh-cw', { size: 16 })}
                Odśwież
              </button>
            </div>
          </div>
          
          <div class="content-body">
            ${this.renderRequestsContent()}
            ${this.renderServicesContent()}
            ${this.renderTransportContent()}
            ${this.renderDispositionsContent()}
          </div>
        </div>
      </div>
    `;
  }

  static renderActionButtons(): string {
    return `
      <button class="action-item active" data-action="sync">
        <span class="menu-icon">${IconComponent.render('refresh-cw', { size: 18 })}</span>
        <span class="menu-label">Synchronizuj</span>
      </button>
      <button class="action-item" data-action="upload">
        <span class="menu-icon">${IconComponent.render('upload', { size: 18 })}</span>
        <span class="menu-label">Wyślij</span>
      </button>
      <button class="action-item" data-action="download">
        <span class="menu-icon">${IconComponent.render('download', { size: 18 })}</span>
        <span class="menu-label">Pobierz</span>
      </button>
      <button class="action-item" data-action="export">
        <span class="menu-icon">${IconComponent.render('file-text', { size: 18 })}</span>
        <span class="menu-label">Eksport</span>
      </button>
      <button class="action-item" data-action="backup">
        <span class="menu-icon">${IconComponent.render('archive', { size: 18 })}</span>
        <span class="menu-label">Backup</span>
      </button>
    `;
  }

  static renderRequestsContent(): string {
    return `
      <div class="section-content active" id="requests-content">
        <div class="status-summary">
          <div class="status-cards">
            <div class="status-card new">
              <div class="status-number">12</div>
              <div class="status-label">Nowe</div>
            </div>
            <div class="status-card pending">
              <div class="status-number">8</div>
              <div class="status-label">W trakcie</div>
            </div>
            <div class="status-card completed">
              <div class="status-number">45</div>
              <div class="status-label">Zakończone</div>
            </div>
          </div>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Urządzenie</th>
                <th>Typ zgłoszenia</th>
                <th>Status</th>
                <th>Data</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderRequestRows()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static renderServicesContent(): string {
    return `
      <div class="section-content" id="services-content">
        <div class="services-grid">
          <div class="service-card">
            <div class="service-header">
              <div class="service-icon">${IconComponent.render('cpu', { size: 24 })}</div>
              <h3>Serwis urządzeń</h3>
            </div>
            <div class="service-stats">
              <div class="stat-item">
                <span class="stat-value">25</span>
                <span class="stat-label">Aktywne</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">156</span>
                <span class="stat-label">Ukończone</span>
              </div>
            </div>
          </div>

          <div class="service-card">
            <div class="service-header">
              <div class="service-icon">${IconComponent.render('settings', { size: 24 })}</div>
              <h3>Konserwacja</h3>
            </div>
            <div class="service-stats">
              <div class="stat-item">
                <span class="stat-value">8</span>
                <span class="stat-label">Zaplanowane</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">42</span>
                <span class="stat-label">W tym miesiącu</span>
              </div>
            </div>
          </div>

          <div class="service-card">
            <div class="service-header">
              <div class="service-icon">${IconComponent.render('wrench', { size: 24 })}</div>
              <h3>Naprawy</h3>
            </div>
            <div class="service-stats">
              <div class="stat-item">
                <span class="stat-value">12</span>
                <span class="stat-label">Pilne</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">67</span>
                <span class="stat-label">Standardowe</span>
              </div>
            </div>
          </div>
        </div>

        <div class="upcoming-services">
          <h4>Najbliższe serwisy</h4>
          ${this.renderUpcomingServices()}
        </div>
      </div>
    `;
  }

  static renderTransportContent(): string {
    return `
      <div class="section-content" id="transport-content">
        <div class="transport-dashboard">
          <div class="transport-map">
            <div class="map-placeholder">
              ${IconComponent.render('map', { size: 48 })}
              <p>Mapa transportu</p>
            </div>
          </div>
          
          <div class="transport-info">
            <h4>Status transportu</h4>
            ${this.renderTransportItems()}
          </div>
        </div>
      </div>
    `;
  }

  static renderDispositionsContent(): string {
    return `
      <div class="section-content" id="dispositions-content">
        <div class="dispositions-header">
          <h3>Dyspozycje technicznie</h3>
          <button class="btn-add-disposition">
            ${IconComponent.render('plus', { size: 16 })}
            Nowa dyspozycja
          </button>
        </div>

        <div class="dispositions-list">
          ${this.renderDispositionItems()}
        </div>
      </div>
    `;
  }

  static renderRequestRows(): string {
    const requests = [
      { id: 'REQ-001', device: 'PSS-7000 #12345', type: 'Konserwacja', status: 'new', date: '2024-03-15' },
      { id: 'REQ-002', device: 'PSS-5000 #67890', type: 'Naprawa', status: 'pending', date: '2024-03-14' },
      { id: 'REQ-003', device: 'PSS-3000 #11111', type: 'Przegląd', status: 'completed', date: '2024-03-13' },
      { id: 'REQ-004', device: 'REG-001 #22222', type: 'Kalibracja', status: 'new', date: '2024-03-15' },
      { id: 'REQ-005', device: 'ZB-002 #33333', type: 'Wymiana części', status: 'pending', date: '2024-03-12' }
    ];

    return requests.map(req => `
      <tr>
        <td class="request-id">${req.id}</td>
        <td class="device-info">
          <div class="device-name">${req.device}</div>
        </td>
        <td class="request-type">${req.type}</td>
        <td class="request-status">
          <span class="status-badge ${req.status}">${this.getStatusLabel(req.status)}</span>
        </td>
        <td class="request-date">${req.date}</td>
        <td class="request-actions">
          <button class="btn-icon" title="Szczegóły">
            ${IconComponent.render('eye', { size: 14 })}
          </button>
          <button class="btn-icon" title="Edytuj">
            ${IconComponent.render('edit-2', { size: 14 })}
          </button>
          <button class="btn-icon" title="Usuń">
            ${IconComponent.render('trash-2', { size: 14 })}
          </button>
        </td>
      </tr>
    `).join('');
  }

  static renderUpcomingServices(): string {
    const services = [
      { device: 'PSS-7000 #12345', type: 'Przegląd roczny', date: '2024-03-18', time: '09:00' },
      { device: 'PSS-5000 #67890', type: 'Konserwacja', date: '2024-03-19', time: '14:30' },
      { device: 'REG-001 #22222', type: 'Kalibracja', date: '2024-03-20', time: '10:15' }
    ];

    return `
      <div class="services-timeline">
        ${services.map(service => `
          <div class="timeline-item">
            <div class="timeline-date">
              <div class="date">${service.date}</div>
              <div class="time">${service.time}</div>
            </div>
            <div class="timeline-content">
              <h5>${service.device}</h5>
              <p>${service.type}</p>
            </div>
            <div class="timeline-actions">
              <button class="btn-small">Szczegóły</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  static renderTransportItems(): string {
    const transports = [
      { id: 'TR-001', route: 'Warszawa → Kraków', status: 'in-progress', eta: '14:30' },
      { id: 'TR-002', route: 'Gdańsk → Poznań', status: 'scheduled', eta: '16:45' },
      { id: 'TR-003', route: 'Łódź → Wrocław', status: 'completed', eta: '12:00' }
    ];

    return `
      <div class="transport-list">
        ${transports.map(transport => `
          <div class="transport-item ${transport.status}">
            <div class="transport-id">${transport.id}</div>
            <div class="transport-route">${transport.route}</div>
            <div class="transport-eta">ETA: ${transport.eta}</div>
            <div class="transport-status">
              <span class="status-dot ${transport.status}"></span>
              ${this.getTransportStatusLabel(transport.status)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  static renderDispositionItems(): string {
    const dispositions = [
      { id: 'DISP-001', title: 'Wymiana filtrów w PSS-7000', priority: 'high', assignee: 'Jan Kowalski' },
      { id: 'DISP-002', title: 'Przegląd systemu bezpieczeństwa', priority: 'medium', assignee: 'Anna Nowak' },
      { id: 'DISP-003', title: 'Aktualizacja oprogramowania', priority: 'low', assignee: 'Piotr Wiśniewski' }
    ];

    return dispositions.map(disp => `
      <div class="disposition-item">
        <div class="disposition-header">
          <h5>${disp.title}</h5>
          <span class="priority-badge ${disp.priority}">${this.getPriorityLabel(disp.priority)}</span>
        </div>
        <div class="disposition-meta">
          <span class="disposition-id">${disp.id}</span>
          <span class="disposition-assignee">Przypisano: ${disp.assignee}</span>
        </div>
        <div class="disposition-actions">
          <button class="btn-small">Rozpocznij</button>
          <button class="btn-small secondary">Szczegóły</button>
        </div>
      </div>
    `).join('');
  }

  static getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'new': 'Nowe',
      'pending': 'W trakcie',
      'completed': 'Zakończone'
    };
    return labels[status] || status;
  }

  static getTransportStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'scheduled': 'Zaplanowany',
      'in-progress': 'W drodze',
      'completed': 'Zakończony'
    };
    return labels[status] || status;
  }

  static getPriorityLabel(priority: string): string {
    const labels: { [key: string]: string } = {
      'high': 'Wysoki',
      'medium': 'Średni',
      'low': 'Niski'
    };
    return labels[priority] || priority;
  }
}
