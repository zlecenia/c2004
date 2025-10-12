// frontend/src/modules/connect-manager/pages/scenarios.page.ts
export class ScenariosPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🧪 Scenariusze Testów</h2>
          <p>Zarządzaj scenariuszami testów z drag&drop</p>
        </div>
        
        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-header">
              <h3>C20 - Ciśnienie</h3>
              <div class="scenario-actions">
                <button class="btn-icon">✏️</button>
                <button class="btn-icon">🗑️</button>
              </div>
            </div>
            <div class="activity-blocks">
              <div class="activity-block" draggable="true">
                <span class="drag-handle">⋮⋮</span>
                <span class="activity-name">🔋 Test ciśnienia</span>
                <span class="activity-duration">15 min</span>
              </div>
              <div class="activity-block" draggable="true">
                <span class="drag-handle">⋮⋮</span>
                <span class="activity-name">📊 Analiza wyników</span>
                <span class="activity-duration">10 min</span>
              </div>
              <div class="activity-block" draggable="true">
                <span class="drag-handle">⋮⋮</span>
                <span class="activity-name">📝 Dokumentacja</span>
                <span class="activity-duration">5 min</span>
              </div>
            </div>
            <button class="btn-add-activity">➕ Dodaj czynność</button>
          </div>
          
          <div class="scenario-card">
            <div class="scenario-header">
              <h3>Flow Test</h3>
              <div class="scenario-actions">
                <button class="btn-icon">✏️</button>
                <button class="btn-icon">🗑️</button>
              </div>
            </div>
            <div class="activity-blocks">
              <div class="activity-block" draggable="true">
                <span class="drag-handle">⋮⋮</span>
                <span class="activity-name">💨 Test przepływu</span>
                <span class="activity-duration">20 min</span>
              </div>
              <div class="activity-block" draggable="true">
                <span class="drag-handle">⋮⋮</span>
                <span class="activity-name">🔍 Kontrola szczelności</span>
                <span class="activity-duration">15 min</span>
              </div>
            </div>
            <button class="btn-add-activity">➕ Dodaj czynność</button>
          </div>
          
          <div class="scenario-card new">
            <div class="new-scenario-placeholder">
              <span class="plus-icon">➕</span>
              <span>Dodaj nowy scenariusz</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .scenarios-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
      .scenario-card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .scenario-card.new { display: flex; align-items: center; justify-content: center; min-height: 200px; cursor: pointer; border: 2px dashed #ddd; background: #f8f9fa; }
      .new-scenario-placeholder { display: flex; flex-direction: column; align-items: center; gap: 10px; color: #666; }
      .plus-icon { font-size: 48px; }
      .scenario-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
      .scenario-header h3 { margin: 0; font-size: 18px; }
      .scenario-actions { display: flex; gap: 8px; }
      .btn-icon { padding: 6px 10px; border: none; background: #f8f9fa; border-radius: 4px; cursor: pointer; }
      .activity-blocks { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
      .activity-block { display: flex; align-items: center; gap: 10px; padding: 12px; background: #f8f9fa; border-radius: 6px; cursor: move; }
      .activity-block:hover { background: #e9ecef; }
      .drag-handle { color: #999; cursor: grab; }
      .activity-name { flex: 1; font-weight: 500; }
      .activity-duration { font-size: 12px; color: #666; }
      .btn-add-activity { width: 100%; padding: 10px; border: 1px dashed #ddd; background: white; border-radius: 6px; cursor: pointer; color: #666; }
      .btn-add-activity:hover { background: #f8f9fa; }
    `;
  }
}
