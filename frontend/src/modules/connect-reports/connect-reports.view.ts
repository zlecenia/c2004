// frontend/src/modules/connect-reports/connect-reports.view.ts
import { ConnectReportsModule } from './connect-reports.module';
import { IconComponent } from '../../components/icon.component';
import { WeekViewComponent } from './week-view.component';
import { MonthViewComponent } from './month-view.component';

export class ConnectReportsView {
  private currentReportType: string = 'executed';
  private currentView: string = 'week';
  private currentMonth: Date = new Date();
  private weekViewComponent: WeekViewComponent;
  private monthViewComponent: MonthViewComponent;

  constructor(private module: ConnectReportsModule) {
    // module stored for future implementations
    this.weekViewComponent = new WeekViewComponent();
    this.monthViewComponent = new MonthViewComponent();
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-reports-layout';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '📊 Reports Module';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectReports - Wykonane';
    
    container.innerHTML = `
      <div class="reports-layout">
        <!-- Column 1: Report Types -->
        <div class="menu-column">
          <h3 class="column-title">Raporty</h3>
          <button class="report-type-item active" data-type="executed">
            <span class="menu-icon">${IconComponent.render('check-circle', { size: 18 })}</span>
            <span class="menu-label">Wykonane</span>
          </button>
          <button class="report-type-item" data-type="planned">
            <span class="menu-icon">${IconComponent.render('calendar', { size: 18 })}</span>
            <span class="menu-label">Planowane</span>
          </button>

          <button class="report-type-item" data-type="export">
            <span class="menu-icon">${IconComponent.render('download', { size: 18 })}</span>
            <span class="menu-label">Export</span>
          </button>
        </div>

        <!-- Column 2: View Options (shown for planned/analytics) -->
        <div class="menu-column" id="view-column" style="display: none;">
          <h3 class="column-title">Widok</h3>
          <button class="view-item active" data-view="week">
            <span class="menu-icon">${IconComponent.render('calendar', { size: 18 })}</span>
            <span class="menu-label">Tydzień</span>
          </button>
          <button class="view-item" data-view="month">
            <span class="menu-icon">${IconComponent.render('calendar-days', { size: 18 })}</span>
            <span class="menu-label">Miesiąc</span>
          </button>
          <button class="view-item" data-view="year">
            <span class="menu-icon">${IconComponent.render('calendar-days', { size: 18 })}</span>
            <span class="menu-label">Rok</span>
          </button>
          <button class="view-item" data-view="custom">
            <span class="menu-icon">${IconComponent.render('sliders', { size: 18 })}</span>
            <span class="menu-label">Niestandardowy</span>
          </button>
        </div>

        <!-- Column 2.5: Actions & Filters (shown for executed reports) -->
        <div  class="menu-column actions-column" id="actions-column" style="display: none;">
          <h3 class="column-title">Filtry</h3>
           <!-- Left Sidebar with Filters -->
                <div class="reports-sidebar">
                  <div class="search-input-row">
                    <input type="text" class="search-input" placeholder="Szukaj raportów...">
                    <button class="btn-search">🔍</button>
                  </div>
                  
                  <div class="search-filters">
                    <div class="filter-group">
                      <label class="filter-label">Status raportu:</label>
                      <select class="filter-select">
                        <option>📊 Wszystkie raporty</option>
                        <option>✅ Pozytywny</option>
                        <option>⚠️ Ostrzeżenie</option>
                        <option>❌ Błąd</option>
                        <option>🔄 W trakcie</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Urządzenie:</label>
                      <select class="filter-select">
                        <option>🔧 Wszystkie urządzenia</option>
                        <option>📡 RFID Reader</option>
                        <option>📷 QR Scanner</option>
                        <option>📊 Barcode Scanner</option>
                        <option>🌡️ Temperature Sensor</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Operator:</label>
                      <select class="filter-select">
                        <option>👤 Wszyscy operatorzy</option>
                        <option>Jan Kowalski</option>
                        <option>Anna Nowak</option>
                        <option>Piotr Wiśniewski</option>
                        <option>Maria Kowalczyk</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Okres:</label>
                      <select class="filter-select">
                        <option>Poprzedni tydzień</option>
                        <option>Wczoraj</option>
                        <option>Dzisiaj</option>
                        <option>Ostatni tydzień</option>
                        <option>Ostatni miesiąc</option>
                        <option>Cały rok</option>
                        <option>Cała historia</option>
                        <option>📅 zakres dat</option>
                      </select>
                       <input type="date" id="date-from" />
                        <input type="date" id="date-to" />
                    </div>
                    <div class="filter-actions">
                      <button class="btn-filter-apply">✅ Zastosuj</button>
                      <button class="btn-filter-clear">🗑️ Wyczyść</button>
                    </div>
                  </div>
                </div>

        </div>

        <!-- Column 3: Main Content -->
        <div class="main-content">
          <div class="content-body">
            
            <!-- Executed Reports Content -->
            <div id="executed-content" class="report-content active">
              <div class="reports-layout">
               

                <!-- Right Content Area with Results -->
                <div class="reports-results">
                  <div class="results-header">
                    <h4>📊 Wykonane raporty</h4>
                    <div class="results-count">Znaleziono: <strong>18</strong> raportów</div>
                  </div>

                  <div class="reports-table-container">
                    <table class="reports-table">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Urządzenie</th>
                        <th>Operator</th>
                        <th>Status</th>
                        <th>Wykonane</th>
                        <th>Akcje</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-10-09 14:30</td>
                        <td>📡 RFID Reader #1</td>
                        <td>Jan Kowalski</td>
                        <td><span class="status-success">✅ Pozytywny</span></td>
                        <td>45/50</td>
                        <td>
                          <button class="btn-action view">👁️</button>
                          <button class="btn-action download">📥</button>
                        </td>
                      </tr>
                      <tr>
                        <td>2025-10-09 13:15</td>
                        <td>📷 QR Scanner #2</td>
                        <td>Anna Nowak</td>
                        <td><span class="status-warning">⚠️ Częściowy</span></td>
                        <td>32/40</td>
                        <td>
                          <button class="btn-action view">👁️</button>
                          <button class="btn-action download">📥</button>
                        </td>
                      </tr>
                      <tr>
                        <td>2025-10-09 12:00</td>
                        <td>📊 Barcode Scanner</td>
                        <td>Piotr Wiśniewski</td>
                        <td><span class="status-error">❌ Negatywny</span></td>
                        <td>0/25</td>
                        <td>
                          <button class="btn-action view">👁️</button>
                          <button class="btn-action download">📥</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Planned Reports Content -->
            <div id="planned-content" class="report-content">
              <div class="reports-section">
                
                <div id="planned-week-view" class="view-content active">
                  ${this.weekViewComponent.render()}
                </div>

                <div id="planned-month-view" class="view-content">
                  ${this.monthViewComponent.render()}
                </div>

                <div id="planned-year-view" class="view-content">
                  <div class="yearly-overview">
                    <!-- Previous Year -->
                    <div class="year-section">
                      <h5>2024 <span class="year-badge previous">Poprzedni</span></h5>
                      <div class="year-stats">
                        <div class="year-total">
                          <span class="total-number">2,847</span>
                          <span class="total-label">Całkowite testy</span>
                        </div>
                        <div class="monthly-breakdown">
                          <div class="month-bar">
                            <div class="month-name">Sty</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 85%;" data-value="298">
                                <span class="bar-value">298</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lut</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 72%;" data-value="251">
                                <span class="bar-value">251</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Mar</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 95%;" data-value="332">
                                <span class="bar-value">332</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Kwi</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 68%;" data-value="238">
                                <span class="bar-value">238</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Maj</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 88%;" data-value="308">
                                <span class="bar-value">308</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Cze</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 60%;" data-value="210">
                                <span class="bar-value">210</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lip</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 78%;" data-value="273">
                                <span class="bar-value">273</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Sie</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 82%;" data-value="287">
                                <span class="bar-value">287</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Wrz</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 91%;" data-value="318">
                                <span class="bar-value">318</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Paź</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 100%;" data-value="349">
                                <span class="bar-value">349</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lis</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 75%;" data-value="262">
                                <span class="bar-value">262</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Gru</div>
                            <div class="month-chart">
                              <div class="chart-bar" style="height: 65%;" data-value="227">
                                <span class="bar-value">227</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Current Year -->
                    <div class="year-section current">
                      <h5>2025 <span class="year-badge current">Aktualny</span></h5>
                      <div class="year-stats">
                        <div class="year-total">
                          <span class="total-number">2,156</span>
                          <span class="total-label">Testy do tej pory</span>
                        </div>
                        <div class="monthly-breakdown">
                          <div class="month-bar">
                            <div class="month-name">Sty</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 92%;" data-value="322">
                                <span class="bar-value">322</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lut</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 76%;" data-value="267">
                                <span class="bar-value">267</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Mar</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 89%;" data-value="312">
                                <span class="bar-value">312</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Kwi</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 71%;" data-value="249">
                                <span class="bar-value">249</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Maj</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 84%;" data-value="294">
                                <span class="bar-value">294</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Cze</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 63%;" data-value="221">
                                <span class="bar-value">221</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lip</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 79%;" data-value="277">
                                <span class="bar-value">277</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Sie</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 86%;" data-value="301">
                                <span class="bar-value">301</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Wrz</div>
                            <div class="month-chart">
                              <div class="chart-bar completed" style="height: 73%;" data-value="256">
                                <span class="bar-value">256</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Paź</div>
                            <div class="month-chart">
                              <div class="chart-bar partial" style="height: 45%;" data-value="157">
                                <span class="bar-value">157</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lis</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 70%;" data-value="245">
                                <span class="bar-value">245</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Gru</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 58%;" data-value="203">
                                <span class="bar-value">203</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Next Year -->
                    <div class="year-section">
                      <h5>2026 <span class="year-badge future">Planowany</span></h5>
                      <div class="year-stats">
                        <div class="year-total">
                          <span class="total-number">3,420</span>
                          <span class="total-label">Planowane testy</span>
                        </div>
                        <div class="monthly-breakdown">
                          <div class="month-bar">
                            <div class="month-name">Sty</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 88%;" data-value="308">
                                <span class="bar-value">308</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lut</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 74%;" data-value="259">
                                <span class="bar-value">259</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Mar</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 95%;" data-value="332">
                                <span class="bar-value">332</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Kwi</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 81%;" data-value="284">
                                <span class="bar-value">284</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Maj</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 90%;" data-value="315">
                                <span class="bar-value">315</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Cze</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 67%;" data-value="234">
                                <span class="bar-value">234</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lip</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 85%;" data-value="298">
                                <span class="bar-value">298</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Sie</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 92%;" data-value="322">
                                <span class="bar-value">322</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Wrz</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 78%;" data-value="273">
                                <span class="bar-value">273</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Paź</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 100%;" data-value="349">
                                <span class="bar-value">349</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Lis</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 83%;" data-value="291">
                                <span class="bar-value">291</span>
                              </div>
                            </div>
                          </div>
                          <div class="month-bar">
                            <div class="month-name">Gru</div>
                            <div class="month-chart">
                              <div class="chart-bar planned" style="height: 71%;" data-value="248">
                                <span class="bar-value">248</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Year Summary -->
                    <div class="year-summary">
                      <h6>Podsumowanie 3 lat:</h6>
                      <div class="summary-stats">
                        <div class="summary-item">
                          <span class="summary-label">2024 (Wykonane)</span>
                          <span class="summary-value">2,847</span>
                          <span class="summary-trend">+12%</span>
                        </div>
                        <div class="summary-item current">
                          <span class="summary-label">2025 (W trakcie)</span>
                          <span class="summary-value">2,156 / 3,105</span>
                          <span class="summary-progress">69%</span>
                        </div>
                        <div class="summary-item">
                          <span class="summary-label">2026 (Planowane)</span>
                          <span class="summary-value">3,420</span>
                          <span class="summary-trend">+20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="planned-custom-view" class="view-content">
                  <div class="custom-range">
                    <div class="date-picker-section">
                      <div class="date-range-inputs">
                        <div class="date-group">
                          <label>Data od:</label>
                          <input type="date" id="custom-date-from" value="2025-01-01" />
                        </div>
                        <div class="date-group">
                          <label>Data do:</label>
                          <input type="date" id="custom-date-to" value="2025-12-31" />
                        </div>
                        <button class="btn-generate">📊 Generuj Raport</button>
                      </div>
                      
                      <div class="custom-results">
                        <div class="monthly-details">
                          <div class="details-table">
                            <div class="table-header">
                              <span>Miesiąc</span>
                              <span>Testy</span>
                              <span>Sukces</span>
                              <span>Błędy</span>
                              <span>%</span>
                            </div>
                            <div class="table-row">
                              <span>Styczeń</span>
                              <span>322</span>
                              <span>295</span>
                              <span>27</span>
                              <span class="success">91.6%</span>
                            </div>
                            <div class="table-row">
                              <span>Luty</span>
                              <span>267</span>
                              <span>248</span>
                              <span>19</span>
                              <span class="success">92.9%</span>
                            </div>
                            <div class="table-row">
                              <span>Marzec</span>
                              <span>312</span>
                              <span>289</span>
                              <span>23</span>
                              <span class="success">92.6%</span>
                            </div>
                            <div class="table-row">
                              <span>Kwiecień</span>
                              <span>249</span>
                              <span>227</span>
                              <span>22</span>
                              <span class="success">91.2%</span>
                            </div>
                            <div class="table-row">
                              <span>Maj</span>
                              <span>294</span>
                              <span>271</span>
                              <span>23</span>
                              <span class="success">92.2%</span>
                            </div>
                            <div class="table-row">
                              <span>Czerwiec</span>
                              <span>221</span>
                              <span>201</span>
                              <span>20</span>
                              <span class="warning">90.9%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analytics Content -->
            <div id="analytics-content" class="report-content">
              <div class="reports-section">
                <h4>📈 Analityka Systemowa</h4>
                
                <div class="analytics-dashboard">
                  <div class="metrics-row">
                    <div class="metric-card">
                      <div class="metric-icon">✅</div>
                      <div class="metric-value">1,234</div>
                      <div class="metric-label">Pomyślne testy</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-icon">❌</div>
                      <div class="metric-value">56</div>
                      <div class="metric-label">Nieudane testy</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-icon">📊</div>
                      <div class="metric-value">95.6%</div>
                      <div class="metric-label">Skuteczność</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-icon">⏱️</div>
                      <div class="metric-value">2.3s</div>
                      <div class="metric-label">Średni czas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Export Content -->
            <div id="export-content" class="report-content">
              <div class="reports-section">
                <h4>📤 Export Raportów</h4>
                
                <div class="export-options">
                  <div class="export-section">
                    <h5>Format pliku</h5>
                    <div class="radio-group">
                      <label><input type="radio" name="format" value="pdf" checked> PDF</label>
                      <label><input type="radio" name="format" value="excel"> Excel</label>
                      <label><input type="radio" name="format" value="csv"> CSV</label>
                    </div>
                  </div>
                  
                  <div class="export-section">
                    <h5>Zakres danych</h5>
                    <div class="date-range">
                      <input type="date" id="export-from" />
                      <span>do</span>
                      <input type="date" id="export-to" />
                    </div>
                  </div>
                  
                  <div class="export-actions">
                    <button class="btn-export primary">📥 Generuj raport</button>
                    <button class="btn-export secondary">📋 Podgląd</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;

    this.addStyles();
    this.setupEventListeners(container);
    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .connect-reports-layout { height: 100%; overflow: hidden; }
      .reports-layout { display: flex; height: 365px; background: #f5f5f5; }
      .main-content { flex: 1; }
      .menu-column { width: 120px; background: #2a2a2a; padding: 3px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a; }
      .actions-column { width: 240px; background: #f8f9fa; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #e0e0e0; }
      .column-title { color: #FFF; font-size: 10px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px; }
      .report-type-item, .view-item { width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin-bottom: 4px; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .report-type-item:hover, .view-item:hover { background: #4a4a4a; }
      .report-type-item.active, .view-item.active { background: #6366f1; color: white; }
      .menu-icon { font-size: 13px; }
      .menu-label { font-size: 12px; font-weight: 500; text-align: center; }
      .main-content { flex: 1; display: flex; flex-direction: row; background: white; overflow: hidden; }
      .content-body { flex: 1; padding: 0px; overflow-y: auto; }
      
      .report-content { display: none; }
      .report-content.active { display: block; }
      .view-content { display: none; }
      .view-content.active { display: block; }
      
      .reports-section h4 { margin: 0 0 15px 0; font-size: 13px; color: #333; font-weight: 600; }
      .search-section { background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 15px; }
      .search-row { display: flex; gap: 10px; margin-bottom: 10px; }
      .filters-row { display: flex; gap: 10px; flex-wrap: wrap; }
      .search-row input, .filters-row select, .filters-row input { padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .search-row input { flex: 1; }
      .btn-search { padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
      
      .reports-table { width: 100%; border-collapse: collapse; font-size: 12px; }
      .reports-table th, .reports-table td { padding: 8px; border: 1px solid #ddd; text-align: left; }
      .reports-table th { background: #f8f9fa; font-weight: 600; position: sticky; top: 0; }
      .btn-action { padding: 4px 8px; margin: 0 2px; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; }
      .status-success { color: #28a745; font-weight: 600; }
      .status-warning { color: #ffc107; font-weight: 600; }
      .status-error { color: #dc3545; font-weight: 600; }
      
      /* Calendar styles */
      .calendar-week h5 { margin: 0 0 15px 0; font-size: 14px; color: #333; }
      .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
      .day-column { background: white; border: 1px solid #e0e0e0; border-radius: 6px; min-height: 200px; overflow: hidden; }
      .day-header { 
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
        color: white; 
        padding: 8px; 
        text-align: center; 
        font-weight: 600; 
        font-size: 11px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .day-date { 
        background: rgba(255, 255, 255, 0.2); 
        border-radius: 50%; 
        width: 20px; 
        height: 20px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 10px; 
        font-weight: 700;
      }
      .day-content { padding: 6px; max-height: 170px; overflow-y: auto; }
      .task-item { 
        background: #e3f2fd; 
        padding: 4px 6px; 
        margin-bottom: 3px; 
        border-radius: 4px; 
        font-size: 9px; 
        font-weight: 500;
        border-left: 3px solid #2196f3;
        transition: all 0.2s ease;
        cursor: pointer;
      }
      .task-item:hover { 
        background: #bbdefb; 
        transform: translateX(2px); 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .task-item.high { 
        background: #ffebee; 
        border-left-color: #f44336; 
        color: #c62828; 
      }
      .task-item.high:hover { background: #ffcdd2; }
      .task-item.low { 
        background: #f3e5f5; 
        border-left-color: #9c27b0; 
        color: #6a1b9a; 
        opacity: 0.8;
      }
      .task-item.low:hover { background: #e1bee7; }
      
      /* Monthly Calendar Grid */
      .calendar-months { display: flex; flex-direction: column; gap: 20px; }
      .month-calendar { background: white; border-radius: 8px; padding: 15px; border: 1px solid #e0e0e0; }
      .month-calendar.current { border-color: #6366f1; box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2); }
      .month-calendar h5 { 
        margin: 0 0 15px 0; 
        font-size: 13px; 
        color: #333; 
        text-align: center; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        gap: 10px;
      }
      .month-badge { 
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
        color: white; 
        padding: 4px 12px; 
        border-radius: 20px; 
        font-size: 12px; 
        font-weight: 600;
      }
      
      .month-grid { 
        display: grid; 
        grid-template-columns: repeat(7, 1fr); 
        gap: 2px; 
        border: 1px solid #e0e0e0; 
        border-radius: 6px; 
        overflow: hidden;
      }
      
      .weekday-header { 
        background: #f8f9fa; 
        padding: 3px 4px; 
        text-align: center; 
        font-size: 11px; 
        font-weight: 600; 
        color: #495057; 
        border-right: 1px solid #e0e0e0;
      }
      .weekday-header:last-child { border-right: none; }
      
      .day-cell { 
        min-height: 35px; 
        padding: 4px; 
        border-right: 1px solid #e0e0e0; 
        border-bottom: 1px solid #e0e0e0; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 12px; 
        font-weight: 600; 
        position: relative; 
        cursor: pointer; 
        transition: all 0.2s ease;
      }
      .day-cell:last-child { border-right: none; }
      .day-cell.empty { background: #f8f9fa; cursor: default; }
      
      /* Test intensity colors */
      .day-cell.tests-low { background: #e8f5e8; color: #2d7d2d; }
      .day-cell.tests-medium { background: #fff3cd; color: #8a6d00; }
      .day-cell.tests-high { background: #f8d7da; color: #721c24; }
      .day-cell.tests-current { 
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
        color: white; 
        font-weight: 700; 
        box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
      }
      
      /* Hover effects */
      .day-cell:not(.empty):hover { 
        transform: translateY(-1px); 
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); 
        z-index: 10;
      }
      
      /* Test count badges */
      .test-count { 
        position: absolute; 
        top: 2px; 
        right: 2px; 
        background: rgba(0, 0, 0, 0.7); 
        color: white; 
        border-radius: 50%; 
        width: 16px; 
        height: 16px; 
        font-size: 9px; 
        font-weight: 700; 
        display: flex; 
        align-items: center; 
        justify-content: center;
      }
      .day-cell.tests-current .test-count { 
        background: rgba(255, 255, 255, 0.3); 
      }
      
      /* Calendar Legend */
      .calendar-legend { 
        background: #f8f9fa; 
        padding: 15px; 
        border-radius: 8px; 
        border: 1px solid #e0e0e0; 
        margin-top: 15px;
      }
      .calendar-legend h6 { 
        margin: 0 0 10px 0; 
        font-size: 14px; 
        color: #333; 
        font-weight: 600;
      }
      .legend-items { display: flex; gap: 20px; flex-wrap: wrap; }
      .legend-item { display: flex; align-items: center; gap: 8px; }
      .legend-color { 
        width: 20px; 
        height: 20px; 
        border-radius: 4px; 
        border: 1px solid #ddd;
      }
      .legend-item span { font-size: 12px; color: #495057; }
      
      /* Yearly Overview */
      .yearly-overview { display: flex; flex-direction: column; gap: 25px; }
      .year-section { 
        background: white; 
        border-radius: 10px; 
        padding: 20px; 
        border: 1px solid #e0e0e0; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }
      .year-section.current { 
        border-color: #6366f1; 
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15); 
      }
      
      .year-section h5 { 
        margin: 0 0 20px 0; 
        font-size: 20px; 
        color: #333; 
        display: flex; 
        align-items: center; 
        gap: 15px; 
        font-weight: 700;
      }
      
      .year-badge { 
        padding: 6px 16px; 
        border-radius: 25px; 
        font-size: 12px; 
        font-weight: 600; 
      }
      .year-badge.previous { background: #6c757d; color: white; }
      .year-badge.current { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; }
      .year-badge.future { background: #17a2b8; color: white; }
      
      .year-stats { display: flex; gap: 30px; align-items: flex-start; }
      .year-total { 
        min-width: 200px; 
        text-align: center; 
        padding: 20px; 
        background: #f8f9fa; 
        border-radius: 8px; 
        border: 1px solid #e9ecef;
      }
      .total-number { 
        display: block; 
        font-size: 32px; 
        font-weight: 700; 
        color: #333; 
        margin-bottom: 8px;
      }
      .total-label { 
        font-size: 14px; 
        color: #666; 
        font-weight: 500;
      }
      
      .monthly-breakdown { 
        flex: 1; 
        display: flex; 
        gap: 8px; 
        align-items: flex-end; 
        height: 120px;
      }
      .month-bar { 
        flex: 1; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        height: 100%;
      }
      .month-name { 
        font-size: 11px; 
        font-weight: 600; 
        color: #666; 
        margin-bottom: 8px;
      }
      .month-chart { 
        flex: 1; 
        width: 100%; 
        display: flex; 
        align-items: flex-end; 
        justify-content: center;
      }
      .chart-bar { 
        width: 100%; 
        max-width: 35px; 
        background: #e9ecef; 
        border-radius: 4px 4px 0 0; 
        position: relative; 
        cursor: pointer; 
        transition: all 0.3s ease;
        min-height: 8px;
      }
      .chart-bar:hover { 
        transform: translateY(-2px); 
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
      
      /* Chart bar colors by status */
      .chart-bar.completed { background: linear-gradient(to top, #28a745 0%, #34ce57 100%); }
      .chart-bar.partial { background: linear-gradient(to top, #ffc107 0%, #ffcd39 100%); }
      .chart-bar.planned { background: linear-gradient(to top, #6c757d 0%, #8d959e 100%); }
      .chart-bar:not(.completed):not(.partial):not(.planned) { 
        background: linear-gradient(to top, #007bff 0%, #0056b3 100%); 
      }
      
      .bar-value { 
        position: absolute; 
        top: -20px; 
        left: 50%; 
        transform: translateX(-50%); 
        font-size: 9px; 
        font-weight: 600; 
        color: #333; 
        opacity: 0; 
        transition: opacity 0.3s ease;
      }
      .chart-bar:hover .bar-value { opacity: 1; }
      
      /* Year Summary */
      .year-summary { 
        background: #f8f9fa; 
        padding: 20px; 
        border-radius: 10px; 
        border: 1px solid #e9ecef;
      }
      .year-summary h6 { 
        margin: 0 0 15px 0; 
        font-size: 13px; 
        color: #333; 
        font-weight: 600;
      }
      .summary-stats { display: flex; gap: 20px; }
      .summary-item { 
        flex: 1; 
        background: white; 
        padding: 15px; 
        border-radius: 8px; 
        border: 1px solid #e0e0e0; 
        text-align: center;
      }
      .summary-item.current { 
        border-color: #6366f1; 
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
      }
      .summary-label { 
        display: block; 
        font-size: 12px; 
        color: #666; 
        margin-bottom: 8px;
      }
      .summary-value { 
        display: block; 
        font-size: 13px; 
        font-weight: 700; 
        color: #333; 
        margin-bottom: 4px;
      }
      .summary-trend { 
        font-size: 12px; 
        font-weight: 600; 
        color: #28a745;
      }
      .summary-progress { 
        font-size: 12px; 
        font-weight: 600; 
        color: #6366f1;
      }
      
      /* Custom Range View */
      .custom-range { background: white; padding: 2px; border-radius: 10px; border: 1px solid #e0e0e0; }
      .custom-range h5 { margin: 0 0 20px 0; font-size: 13px; color: #333; font-weight: 600; }
      .date-picker-section { display: flex; flex-direction: column; gap: 0px; }
      .date-range-inputs { 
        display: flex; 
        gap: 20px; 
        align-items: flex-end; 
        padding: 20px; 
        background: #f8f9fa; 
        border-radius: 8px;
      }
      .date-group { display: flex; flex-direction: column; gap: 5px; }
      .date-group label { font-size: 12px; font-weight: 600; color: #333; }
      .date-group input { 
        padding: 8px 12px; 
        border: 1px solid #ddd; 
        border-radius: 4px; 
        font-size: 12px;
      }
      .btn-generate { 
        padding: 8px 20px; 
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%); 
        color: white; 
        border: none; 
        border-radius: 6px; 
        cursor: pointer; 
        font-size: 12px; 
        font-weight: 600;
      }
      
      .custom-results { display: flex; flex-direction: column; gap: 20px; }
      .results-header h6 { margin: 0; font-size: 13px; color: #333; font-weight: 600; }
      .results-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
      .result-card { 
        background: white; 
        padding: 20px; 
        border-radius: 8px; 
        text-align: center; 
        border: 1px solid #e0e0e0; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }
      .result-icon { font-size: 24px; margin-bottom: 10px; }
      .result-value { 
        font-size: 20px; 
        font-weight: 700; 
        color: #333; 
        margin-bottom: 5px;
      }
      .result-label { font-size: 12px; color: #666; }
      
      .monthly-details { background: #f8f9fa; padding: 15px; border-radius: 8px; }
      .monthly-details h6 { margin: 0 0 15px 0; font-size: 14px; color: #333; font-weight: 600; }
      .details-table { display: flex; flex-direction: column; gap: 1px; }
      .table-header, .table-row { 
        display: grid; 
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr; 
        gap: 10px; 
        padding: 8px 12px; 
        background: white; 
        font-size: 12px;
      }
      .table-header { 
        font-weight: 600; 
        color: #333; 
        background: #e9ecef; 
        border-radius: 4px 4px 0 0;
      }
      .table-row { border-radius: 0; }
      .table-row:last-child { border-radius: 0 0 4px 4px; }
      .table-row span.success { color: #28a745; font-weight: 600; }
      .table-row span.warning { color: #ffc107; font-weight: 600; }
      
      /* Reports Layout - Executed View */
      .reports-sidebar { 
        min-width: 240px; 
        background: #f8f9fa; 
        padding: 4px;                 
        height: fit-content;
      }
      .reports-results { flex: 1; }
      .search-input-row { display: flex; gap: 6px; margin-bottom: 12px; }
      .search-input { flex: 1; padding: 6px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; }
      .btn-search { padding: 6px 12px; margin-right: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }
      
      /* Month Navigation */
      .month-navigation { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 15px; 
        padding: 10px; 
        background: #f8f9fa; 
        border-radius: 6px; 
        border: 1px solid #e0e0e0;
      }
      .btn-nav-month { 
        display: flex; 
        align-items: center; 
        gap: 6px; 
        padding: 8px 12px; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
        color: white; 
        border: none; 
        border-radius: 4px; 
        cursor: pointer; 
        font-size: 11px; 
        transition: all 0.2s;
      }
      .btn-nav-month:hover { 
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%); 
        transform: translateY(-1px);
      }
      .nav-arrow { 
        font-size: 14px; 
        font-weight: bold; 
      }
      .current-month-display { 
        font-size: 14px; 
        font-weight: 600; 
        color: #333; 
      }
      
      /* Analytics styles */
      .metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
      .metric-card { background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #e0e0e0; }
      .metric-icon { font-size: 24px; margin-bottom: 8px; }
      .metric-value { font-size: 13px; font-weight: 600; color: #333; margin-bottom: 4px; }
      .metric-label { font-size: 11px; color: #666; }
      
      /* Export styles */
      .export-options { background: white; padding: 4px; }
      .export-section { margin-bottom: 20px; }
      .export-section h5 { margin: 0 0 10px 0; font-size: 14px; color: #333; }
      .radio-group { display: flex; gap: 15px; }
      .radio-group label { display: flex; align-items: center; gap: 5px; font-size: 12px; }
      .date-range { display: flex; align-items: center; gap: 10px; }
      .date-range input { padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
      .export-actions { display: flex; gap: 10px; }
      .btn-export { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .btn-export.primary { background: #28a745; color: white; }
      .btn-export.secondary { background: #6c757d; color: white; }
      
      /* Status panel */
      .status-section { margin-bottom: 15px; }
      .status-title { color: #333; font-size: 11px; font-weight: 600; margin: 0 0 10px 0; padding: 8px; background: #e9ecef; border-radius: 4px; text-align: center; }
      .status-item { background: white; padding: 8px; margin-bottom: 6px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e0e0e0; }
      .status-label { font-size: 10px; color: #666; font-weight: 500; }
      .status-value { font-size: 11px; color: #333; font-weight: 600; }
      .status-value.online { color: #28a745; }
      
      .quick-actions { margin-bottom: 15px; }
      .quick-btn { width: 100%; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; border: none; padding: 8px 12px; margin-bottom: 4px; border-radius: 4px; cursor: pointer; font-size: 10px; font-weight: 600; transition: all 0.2s ease; }
      .quick-btn:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3); }
      
      /* Actions Column Styling */
      .actions-column .column-title { color: #333; background: #e9ecef; }
      .actions-column h4 { margin: 15px 0 8px 0; font-size: 12px; color: #495057; font-weight: 600; }
      .search-section { background: white; padding: 12px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #dee2e6; }
      .search-row { margin-bottom: 10px; }
      .search-row input { width: 100%; padding: 8px; border: 1px solid #ced4da; border-radius: 4px; font-size: 12px; margin-bottom: 8px; }
      .btn-search { padding: 6px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .filters-row { display: flex; flex-direction: column; gap: 8px; }
      .filters-row select, .filters-row input { padding: 6px; border: 1px solid #ced4da; border-radius: 4px; font-size: 11px; }
      
      .quick-actions, .filter-presets { background: white; padding: 12px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #dee2e6; }
      .action-btn, .preset-btn { 
        width: 100%; 
        padding: 8px 12px; 
        margin-bottom: 6px; 
        border: none; 
        border-radius: 4px; 
        cursor: pointer; 
        font-size: 11px; 
        font-weight: 600; 
        transition: all 0.2s ease;
      }
      .action-btn { 
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%); 
        color: white; 
      }
      .action-btn:hover { 
        transform: translateY(-1px); 
        box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3); 
      }
      .preset-btn { 
        background: #f8f9fa; 
        color: #495057; 
        border: 1px solid #dee2e6; 
      }
      .preset-btn:hover { 
        background: #e9ecef; 
        border-color: #6366f1; 
      }
      
      /* Component Styles */
      ${this.weekViewComponent.getStyles()}
      ${this.monthViewComponent.getStyles()}
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    console.log('🔧 ConnectReports: Setting up event listeners');
    
    // Report type navigation
    const reportTypeItems = container.querySelectorAll('[data-type]');
    console.log(`🔧 ConnectReports: Found ${reportTypeItems.length} report type buttons`);
    
    reportTypeItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const type = target.getAttribute('data-type');
        console.log(`🔧 ConnectReports: Report type clicked: ${type}`);
        if (type) this.switchReportType(type, container);
      });
    });

    // View navigation (for planned/analytics)
    const viewItems = container.querySelectorAll('[data-view]');
    console.log(`🔧 ConnectReports: Found ${viewItems.length} view buttons`);
    
    viewItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const view = target.getAttribute('data-view');
        console.log(`🔧 ConnectReports: View clicked: ${view}`);
        if (view) this.switchView(view, container);
      });
    });

    // Month navigation now handled by components

    // Listen for external state updates (from main.ts)
    window.addEventListener('connectreports:update-state', (e: any) => {
      const { reportType, view } = e.detail;
      console.log(`🔧 ConnectReports: Received update-state event: ${reportType}/${view}`);
      if (reportType && reportType !== this.currentReportType) {
        this.switchReportType(reportType, container, false); // Don't update URL
      }
      if (view && view !== this.currentView) {
        this.switchView(view, container, false); // Don't update URL
      }
    });

    // Setup component event listeners
    this.weekViewComponent.setupEventListeners(container);
    this.monthViewComponent.setupEventListeners(container);
  }

  private switchReportType(type: string, container: HTMLElement, updateURL: boolean = true): void {
    console.log(`🔧 ConnectReports: Switching to report type: ${type}, updateURL: ${updateURL}`);
    this.currentReportType = type;

    // Update URL hash with type (but only if requested)
    if (updateURL) {
      const currentHash = window.location.hash.slice(2); // Remove '#/'
      const [moduleName] = currentHash.split('/');
      window.location.hash = `#/${moduleName}/${type}`;
      console.log(`🔧 ConnectReports: Updated URL to: ${window.location.hash}`);
    }

    // Update report type menu active state
    container.querySelectorAll('[data-type]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-type') === type) {
        item.classList.add('active');
      }
    });

    // Show/hide view column based on type
    const viewColumn = container.querySelector('#view-column');
    const actionsColumn = container.querySelector('#actions-column');
    
    if (type === 'planned' || type === 'analytics') {
      if (viewColumn) {
        (viewColumn as HTMLElement).style.display = 'block';
        // Set default view
        this.currentView = 'week';
        this.updateViewUI(container);
      }
      if (actionsColumn) (actionsColumn as HTMLElement).style.display = 'none';
    } else if (type === 'executed') {
      if (viewColumn) (viewColumn as HTMLElement).style.display = 'none';
      if (actionsColumn) (actionsColumn as HTMLElement).style.display = 'block';
    } else {
      if (viewColumn) (viewColumn as HTMLElement).style.display = 'none';
      if (actionsColumn) (actionsColumn as HTMLElement).style.display = 'none';
    }

    // Hide all report contents
    container.querySelectorAll('.report-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected report content
    const activeContent = container.querySelector(`#${type}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Update top-bar title
    const titles: any = {
      'executed': 'Wykonane',
      'planned': 'Planowane',
      'analytics': 'Analityka',
      'export': 'Export'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) topBarTitle.textContent = `ConnectReports - ${titles[type]}`;
  }

  private switchView(view: string, container: HTMLElement, updateURL: boolean = true): void {
    console.log(`🔧 ConnectReports: Switching to view: ${view}, updateURL: ${updateURL}`);
    this.currentView = view;

    // Update URL hash with view (but only if requested)
    if (updateURL) {
      const currentHash = window.location.hash.slice(2); // Remove '#/'
      const [moduleName, reportType] = currentHash.split('/');
      window.location.hash = `#/${moduleName}/${reportType}/${view}`;
      console.log(`🔧 ConnectReports: Updated URL to: ${window.location.hash}`);
    }

    this.updateViewUI(container);
  }

  private updateViewUI(container: HTMLElement): void {
    // Update view menu active state
    container.querySelectorAll('[data-view]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-view') === this.currentView) {
        item.classList.add('active');
      }
    });

    // Show/hide view contents (for planned reports)
    if (this.currentReportType === 'planned') {
      container.querySelectorAll('.view-content').forEach(content => {
        content.classList.remove('active');
      });

      const activeViewContent = container.querySelector(`#planned-${this.currentView}-view`);
      if (activeViewContent) {
        activeViewContent.classList.add('active');
      }
    }

    // Update top-bar title
    const viewTitles: any = {
      'week': 'Tydzień',
      'month': 'Miesiąc',
      'year': 'Rok',
      'custom': 'Niestandardowy'
    };

    const reportTitles: any = {
      'executed': 'Wykonane',
      'planned': 'Planowane',
      'analytics': 'Analityka',
      'export': 'Export'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      const viewTitle = this.currentReportType === 'planned' || this.currentReportType === 'analytics' 
        ? ` - ${viewTitles[this.currentView]}` 
        : '';
      topBarTitle.textContent = `ConnectReports - ${reportTitles[this.currentReportType]}${viewTitle}`;
    }
  }


  // Public methods for URL routing support
  public setInitialReportType(type: string): void {
    console.log(`🔧 ConnectReports: Setting initial report type from URL: ${type}`);
    const container = document.querySelector('.connect-reports-layout');
    if (container) {
      this.switchReportType(type, container as HTMLElement);
    }
  }

  public setInitialView(view: string): void {
    console.log(`🔧 ConnectReports: Setting initial view from URL: ${view}`);
    this.currentView = view;
    const container = document.querySelector('.connect-reports-layout');
    if (container) {
      this.updateViewUI(container as HTMLElement);
    }
  }
}
