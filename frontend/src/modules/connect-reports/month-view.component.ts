// frontend/src/modules/connect-reports/month-view.component.ts

export interface MonthData {
  year: number;
  month: number;
  monthName: string;
  weeks: WeekInMonth[];
}

export interface WeekInMonth {
  days: DayInMonth[];
}

export interface DayInMonth {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  testCount: number;
  testLevel: 'none' | 'low' | 'medium' | 'high' | 'current';
}

export class MonthViewComponent {
  private currentMonth: Date = new Date();

  constructor() {
    // Set to first day of current month
    this.currentMonth.setDate(1);
  }

  public render(): string {
    const currentMonthData = this.generateMonthData(this.currentMonth);
    const prevMonthData = this.generateMonthData(this.getPreviousMonth());
    
    return `
      <div class="month-view-component">
        <div class="month-navigation">
          <button class="btn-nav-month" id="prev-month">
            <span class="nav-arrow">‹</span>
            <span class="nav-text">Poprzedni miesiąc</span>
          </button>
          <div class="current-month-display">
            <span id="current-month-name">${this.getMonthDisplayName()}</span>
          </div>
          <button class="btn-nav-month" id="next-month">
            <span class="nav-text">Następny miesiąc</span>
            <span class="nav-arrow">›</span>
          </button>
        </div>
        
        <div class="calendar-months">
          <!-- Previous Month -->
          <div class="month-calendar">
            <h5>${prevMonthData.monthName} ${prevMonthData.year}</h5>
            <div class="month-grid">
              ${this.renderWeekHeaders()}
              ${prevMonthData.weeks.map(week => this.renderWeek(week)).join('')}
            </div>
          </div>

          <!-- Current Month -->
          <div class="month-calendar current">
            <h5>${currentMonthData.monthName} ${currentMonthData.year} <span class="month-badge">Aktualny</span></h5>
            <div class="month-grid">
              ${this.renderWeekHeaders()}
              ${currentMonthData.weeks.map(week => this.renderWeek(week)).join('')}
            </div>
          </div>
        </div>
        
        <div class="month-legend">
          <div class="legend-item">
            <div class="legend-color tests-low"></div>
            <span>1-3 testy</span>
          </div>
          <div class="legend-item">
            <div class="legend-color tests-medium"></div>
            <span>4-6 testów</span>
          </div>
          <div class="legend-item">
            <div class="legend-color tests-high"></div>
            <span>7+ testów</span>
          </div>
          <div class="legend-item">
            <div class="legend-color tests-current"></div>
            <span>Dzisiaj</span>
          </div>
        </div>
      </div>
    `;
  }

  private renderWeekHeaders(): string {
    const headers = ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob', 'Nie'];
    return headers.map(header => `<div class="weekday-header">${header}</div>`).join('');
  }

  private renderWeek(week: WeekInMonth): string {
    return week.days.map(day => this.renderDay(day)).join('');
  }

  private renderDay(day: DayInMonth): string {
    if (!day.isCurrentMonth) {
      return '<div class="day-cell empty"></div>';
    }

    const classes = ['day-cell'];
    if (day.testLevel !== 'none') {
      classes.push(`tests-${day.testLevel}`);
    }

    const testCountSpan = day.testCount > 0 ? `<span class="test-count">${day.testCount}</span>` : '';
    
    return `<div class="${classes.join(' ')}">${day.date}${testCountSpan}</div>`;
  }

  private generateMonthData(date: Date): MonthData {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = this.getMonthName(month);
    
    const firstDay = new Date(year, month, 1);
    
    // Get first Monday of the calendar (might be from previous month)
    const startDate = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startDate.setDate(firstDay.getDate() + daysToMonday);
    
    const weeks: WeekInMonth[] = [];
    const currentDate = new Date(startDate);
    
    // Generate 6 weeks to cover the full month view
    for (let week = 0; week < 6; week++) {
      const weekDays: DayInMonth[] = [];
      
      for (let day = 0; day < 7; day++) {
        const isCurrentMonth = currentDate.getMonth() === month;
        const isToday = this.isToday(currentDate);
        
        weekDays.push({
          date: currentDate.getDate(),
          isCurrentMonth: isCurrentMonth,
          isToday: isToday,
          testCount: isCurrentMonth ? this.getTestCountForDay(currentDate) : 0,
          testLevel: isCurrentMonth ? this.getTestLevelForDay(currentDate, isToday) : 'none'
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      weeks.push({ days: weekDays });
    }
    
    return {
      year,
      month,
      monthName,
      weeks
    };
  }

  private getMonthName(month: number): string {
    const months = [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];
    return months[month];
  }

  private getMonthDisplayName(): string {
    return `${this.getMonthName(this.currentMonth.getMonth())} ${this.currentMonth.getFullYear()}`;
  }

  private getPreviousMonth(): Date {
    const prevMonth = new Date(this.currentMonth);
    prevMonth.setMonth(this.currentMonth.getMonth() - 1);
    return prevMonth;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  private getTestCountForDay(date: Date): number {
    // Generate sample test counts based on date
    const day = date.getDate();
    const patterns = [0, 2, 5, 3, 8, 6, 9, 1, 4, 7];
    return patterns[day % patterns.length];
  }

  private getTestLevelForDay(date: Date, isToday: boolean): 'none' | 'low' | 'medium' | 'high' | 'current' {
    if (isToday) return 'current';
    
    const testCount = this.getTestCountForDay(date);
    if (testCount === 0) return 'none';
    if (testCount <= 3) return 'low';
    if (testCount <= 6) return 'medium';
    return 'high';
  }

  public setupEventListeners(container: HTMLElement): void {
    const prevMonthBtn = container.querySelector('#prev-month');
    const nextMonthBtn = container.querySelector('#next-month');
    
    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', () => {
        this.changeMonth(-1);
        this.refreshView(container);
      });
    }
    
    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', () => {
        this.changeMonth(1);
        this.refreshView(container);
      });
    }

    // Add click listeners for day cells
    const dayCells = container.querySelectorAll('.day-cell:not(.empty)');
    dayCells.forEach(cell => {
      cell.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const date = target.textContent?.split('\n')[0] || '';
        this.onDayClick(parseInt(date));
      });
    });
  }

  private changeMonth(direction: number): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + direction);
  }

  private refreshView(container: HTMLElement): void {
    const monthViewElement = container.querySelector('.month-view-component');
    if (monthViewElement) {
      monthViewElement.innerHTML = this.render().replace('<div class="month-view-component">', '').replace('</div>', '');
      this.setupEventListeners(container);
    }
  }

  private onDayClick(day: number): void {
    // Here you could emit events or call callbacks for day selection
  }

  public getCurrentMonth(): Date {
    return new Date(this.currentMonth);
  }

  public setMonth(date: Date): void {
    this.currentMonth = new Date(date);
    this.currentMonth.setDate(1);
  }

  public getStyles(): string {
    return `
      /* Month View Component Styles */
      .month-view-component {
        width: 100%;
      }
      
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
      
      .calendar-months {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 15px;
      }
      
      .month-calendar {
        background: white;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        padding: 15px;
      }
      
      .month-calendar.current {
        border-color: #6366f1;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
      }
      
      .month-calendar h5 {
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #333;
        font-weight: 600;
        text-align: center;
      }
      
      .month-badge {
        background: #6366f1;
        color: white;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 500;
      }
      
      .month-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        background: #e0e0e0;
        border-radius: 6px;
        overflow: hidden;
      }
      
      .weekday-header {
        background: #f8f9fa;
        padding: 3px 4px;
        text-align: center;
        font-size: 11px;
        font-weight: 600;
        color: #666;
      }
      
      .day-cell {
        background: white;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 500;
        position: relative;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .day-cell:hover:not(.empty) {
        background: #f0f0f0;
        transform: scale(1.05);
      }
      
      .day-cell.empty {
        background: #f8f9fa;
        cursor: default;
      }
      
      .day-cell.tests-low {
        background: #f0fdf4;
        color: #166534;
      }
      
      .day-cell.tests-medium {
        background: #fffbeb;
        color: #92400e;
      }
      
      .day-cell.tests-high {
        background: #fef2f2;
        color: #991b1b;
      }
      
      .day-cell.tests-current {
        background: #6366f1;
        color: white;
        font-weight: 700;
      }
      
      .test-count {
        position: absolute;
        top: 2px;
        right: 2px;
        background: rgba(0, 0, 0, 0.1);
        color: inherit;
        font-size: 8px;
        padding: 1px 3px;
        border-radius: 6px;
        line-height: 1;
      }
      
      .month-legend {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
      }
      
      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        color: #666;
      }
      
      .legend-color {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        border: 1px solid #ddd;
      }
      
      .legend-color.tests-low {
        background: #f0fdf4;
      }
      
      .legend-color.tests-medium {
        background: #fffbeb;
      }
      
      .legend-color.tests-high {
        background: #fef2f2;
      }
      
      .legend-color.tests-current {
        background: #6366f1;
      }
    `;
  }
}
