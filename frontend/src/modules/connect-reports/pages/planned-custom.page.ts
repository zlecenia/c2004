// frontend/src/modules/connect-reports/pages/planned-custom.page.ts
export class PlannedCustomPage {
  static getContent(): string {
    return `<div class="page-content"><div class="page-header"><h2>📅 Raporty Zaplanowane - Niestandardowy zakres</h2><p>Wybierz zakres dat dla planu</p></div><div class="date-range"><input type="date" class="input-date"><input type="date" class="input-date"><button class="btn-generate">📊 Generuj plan</button></div><div class="planned-table"><table><thead><tr><th>Data</th><th>Raport</th><th>Typ</th><th>Status</th></tr></thead><tbody><tr><td>2025-10-15</td><td>🔧 Konserwacja #890</td><td>Serwis</td><td><span class="badge planned">📅 Zaplanowane</span></td></tr></tbody></table></div></div>`;
  }
  static getStyles(): string {
    return `.page-content{padding:20px;max-width:1000px;margin:0 auto}.page-header h2{color:#333;font-size:24px;margin-bottom:5px}.date-range{display:flex;gap:15px;padding:20px;background:white;border-radius:8px;margin-bottom:20px}.input-date{padding:10px;border:1px solid #ddd;border-radius:6px;flex:1}.btn-generate{padding:10px 24px;background:#28a745;color:white;border:none;border-radius:6px;cursor:pointer}.planned-table{background:white;padding:20px;border-radius:8px}table{width:100%;border-collapse:collapse}th{text-align:left;padding:12px;background:#f8f9fa}td{padding:12px;border-bottom:1px solid #e9ecef}.badge{padding:4px 12px;border-radius:4px;font-size:12px}.badge.planned{background:#d1ecf1;color:#0c5460}`;
  }
}
