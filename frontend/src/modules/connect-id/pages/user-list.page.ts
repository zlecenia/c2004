// frontend/src/modules/connect-id/pages/user-list.page.ts
export class UserListPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>👤 Identyfikacja Użytkownika - Z listy</h2>
          <p>Wybierz użytkownika z listy zarejestrowanych osób</p>
        </div>
        
        <div class="identification-display">
          <div class="search-panel">
            <div class="search-header">
              <div class="search-icon">🔍</div>
              <input type="text" id="user-search" placeholder="Szukaj użytkownika..." class="search-input">
              <button class="search-btn">Szukaj</button>
            </div>
            <div class="search-filters">
              <select class="filter-select" id="department-filter">
                <option value="">Wszystkie działy</option>
                <option value="admin">Administracja</option>
                <option value="tech">Techniczny</option>
                <option value="qa">Kontrola jakości</option>
                <option value="production">Produkcja</option>
              </select>
              <select class="filter-select" id="role-filter">
                <option value="">Wszystkie role</option>
                <option value="administrator">Administrator</option>
                <option value="manager">Manager</option>
                <option value="technician">Technik</option>
                <option value="operator">Operator</option>
              </select>
            </div>
          </div>
          
          <div class="users-list">
            <h3>Lista użytkowników</h3>
            <div class="users-grid">
              <div class="user-card" data-user-id="user-001">
                <div class="user-avatar">👨‍💼</div>
                <div class="user-details">
                  <div class="user-name">Jan Kowalski</div>
                  <div class="user-id">ID: USR-001</div>
                  <div class="user-role">Administrator</div>
                  <div class="user-department">Administracja</div>
                  <div class="user-status online">🟢 Online</div>
                </div>
                <button class="select-user-btn">Wybierz</button>
              </div>
              
              <div class="user-card" data-user-id="user-002">
                <div class="user-avatar">👩‍🔬</div>
                <div class="user-details">
                  <div class="user-name">Anna Nowak</div>
                  <div class="user-id">ID: USR-002</div>
                  <div class="user-role">Technik</div>
                  <div class="user-department">Kontrola jakości</div>
                  <div class="user-status online">🟢 Online</div>
                </div>
                <button class="select-user-btn">Wybierz</button>
              </div>
              
              <div class="user-card" data-user-id="user-003">
                <div class="user-avatar">👨‍🔧</div>
                <div class="user-details">
                  <div class="user-name">Piotr Wiśniewski</div>
                  <div class="user-id">ID: USR-003</div>
                  <div class="user-role">Operator</div>
                  <div class="user-department">Produkcja</div>
                  <div class="user-status offline">🔴 Offline</div>
                </div>
                <button class="select-user-btn">Wybierz</button>
              </div>
              
              <div class="user-card" data-user-id="user-004">
                <div class="user-avatar">👩‍💼</div>
                <div class="user-details">
                  <div class="user-name">Maria Kowalczyk</div>
                  <div class="user-id">ID: USR-004</div>
                  <div class="user-role">Manager</div>
                  <div class="user-department">Techniczny</div>
                  <div class="user-status online">🟢 Online</div>
                </div>
                <button class="select-user-btn">Wybierz</button>
              </div>
              
              <div class="user-card" data-user-id="user-005">
                <div class="user-avatar">👨‍⚕️</div>
                <div class="user-details">
                  <div class="user-name">Tomasz Nowicki</div>
                  <div class="user-id">ID: USR-005</div>
                  <div class="user-role">Technik</div>
                  <div class="user-department">Kontrola jakości</div>
                  <div class="user-status busy">🟡 Zajęty</div>
                </div>
                <button class="select-user-btn">Wybierz</button>
              </div>
              
              <div class="user-card" data-user-id="user-006">
                <div class="user-avatar">👩‍🏭</div>
                <div class="user-details">
                  <div class="user-name">Katarzyna Lewandowska</div>
                  <div class="user-id">ID: USR-006</div>
                  <div class="user-role">Operator</div>
                  <div class="user-department">Produkcja</div>
                  <div class="user-status online">🟢 Online</div>
                </div>
                <button class="select-user-btn">Wybierz</button>
              </div>
            </div>
          </div>
          
          <div class="selection-history">
            <h3>Ostatnio wybrani użytkownicy</h3>
            <div class="history-item">
              <span class="time">10:45:12</span>
              <span class="type">LIST</span>
              <span class="value">USR-001</span>
              <span class="status success">✅ Jan Kowalski - zalogowany</span>
            </div>
            <div class="history-item">
              <span class="time">10:40:33</span>
              <span class="type">LIST</span>
              <span class="value">USR-002</span>
              <span class="status success">✅ Anna Nowak - zalogowana</span>
            </div>
            <div class="history-item">
              <span class="time">10:35:22</span>
              <span class="type">LIST</span>
              <span class="value">USR-003</span>
              <span class="status success">✅ Piotr Wiśniewski - zalogowany</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content {
        padding: 20px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .page-header h2 {
        color: #333;
        margin: 0 0 10px 0;
        font-size: 24px;
      }

      .page-header p {
        color: #666;
        margin: 0 0 30px 0;
        font-size: 16px;
      }

      .search-panel {
        background: linear-gradient(135deg, #795548, #5D4037);
        color: white;
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 30px;
      }

      .search-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
      }

      .search-icon {
        font-size: 24px;
      }

      .search-input {
        flex: 1;
        padding: 12px 15px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        outline: none;
      }

      .search-btn {
        padding: 12px 20px;
        background: rgba(255,255,255,0.2);
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .search-btn:hover {
        background: rgba(255,255,255,0.3);
      }

      .search-filters {
        display: flex;
        gap: 15px;
      }

      .filter-select {
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        background: rgba(255,255,255,0.9);
        min-width: 150px;
      }

      .users-list h3 {
        color: #333;
        margin: 0 0 20px 0;
        font-size: 18px;
      }

      .users-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
      }

      .user-card {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 20px;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .user-card:hover {
        background: #fff;
        border-color: #795548;
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(121, 85, 72, 0.15);
      }

      .user-avatar {
        font-size: 48px;
        text-align: center;
        margin-bottom: 15px;
      }

      .user-details {
        text-align: center;
        margin-bottom: 15px;
      }

      .user-name {
        font-weight: bold;
        color: #333;
        font-size: 18px;
        margin-bottom: 5px;
      }

      .user-id {
        font-family: monospace;
        color: #666;
        font-size: 12px;
        margin-bottom: 5px;
      }

      .user-role {
        color: #795548;
        font-weight: 500;
        margin-bottom: 3px;
      }

      .user-department {
        color: #999;
        font-size: 13px;
        margin-bottom: 8px;
      }

      .user-status {
        font-size: 12px;
        font-weight: 500;
      }

      .user-status.online {
        color: #4CAF50;
      }

      .user-status.offline {
        color: #f44336;
      }

      .user-status.busy {
        color: #FF9800;
      }

      .select-user-btn {
        width: 100%;
        padding: 10px;
        background: linear-gradient(135deg, #795548, #5D4037);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .select-user-btn:hover {
        background: linear-gradient(135deg, #5D4037, #3E2723);
        transform: translateY(-2px);
      }

      .selection-history h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 18px;
      }

      .history-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px;
        background: #f9f9f9;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .history-item .time {
        color: #666;
        font-family: monospace;
        min-width: 80px;
      }

      .history-item .type {
        background: #795548;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        min-width: 50px;
        text-align: center;
      }

      .history-item .value {
        font-family: monospace;
        background: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        min-width: 80px;
      }

      .history-item .status {
        flex: 1;
        font-weight: 500;
      }

      .history-item .status.success {
        color: #4CAF50;
      }
    `;
  }
}
