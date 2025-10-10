// frontend / src / modules / connect - reports / week - view.component.ts

export interface WeekData {
  weekStart: Date;
  weekEnd: Date;
  days: DayData[];
}

export interface DayData {
  date: number;
  dayName: string;
  dayShort: string;
  tasks: TaskData[];
}

export interface TaskData {
  time: string;
  title: string;
  priority: 'high' | 'medium' | 'low' | 'normal';
}

export class WeekViewComponent {
  private currentWeek: Date = new Date();

  constructor() {
    this.setCurrentWeek();
  }

  private setCurrentWeek(): void {
    // Set to Monday of current week;
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    this.currentWeek = new Date(today);
    this.currentWeek.setDate(today.getDate() + daysToMonday);
  }

  public render(): string {
    const weekData = this.generateWeekData();

    return `
      <div class="week - view - component">
        <div class="week - navigation">
          <button class="btn - nav - week" id="prev - week">
            <span class="nav - arrow">‹</span>
            <span class="nav - text">Poprzedni tydzień</span>
          </button>
          <div class="current - week - display">
            <span id="current - week - range">${this.getWeekRangeText()}</span>
          </div>
          <button class="btn - nav - week" id="next - week">
            <span class="nav - text">Następny tydzień</span>
            <span class="nav - arrow">›</span>
          </button>
        </div>

        <div class="calendar - week">
          <div class="week - grid">
            ${weekData.days.map(day => this.renderDay(day)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  private renderDay(day: DayData): string {
    return `
      <div class="day - column">
        <div class="day - header">${day.dayShort} <span class="day - date">${day.date}</span></div>
        <div class="day - content">
          ${day.tasks.map(task => this.renderTask(task)).join('')}
        </div>
      </div>
    `;
  }

  private renderTask(task: TaskData): string {
    const priorityClass = task.priority !== 'normal' ? ` ${task.priority}` : '';
    return `<div class="task - item${priorityClass}">${task.time} - ${task.title}</div>`;
  }

  private generateWeekData(): WeekData {
    const days: DayData[] = [];
    const dayNames = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    const dayShorts = ['Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob', 'Nie'];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(this.currentWeek);
      currentDay.setDate(this.currentWeek.getDate() + i);

      days.push({
        date: currentDay.getDate(),
        dayName: dayNames[i],
        dayShort: dayShorts[i],
        tasks: this.generateTasksForDay(i)
      });
    }

    const weekEnd = new Date(this.currentWeek);
    weekEnd.setDate(this.currentWeek.getDate() + 6);

    return {
      weekStart: new Date(this.currentWeek),
      weekEnd: weekEnd,
      days: days
    };
  }

  private generateTasksForDay(dayIndex: number): TaskData[] {
    // Sample data for different days;
    const tasksByDay: { [key: number]: TaskData[] } = {
      0: [ // Monday
        { time: '08:00', title: 'System Startup Check', priority: 'high' },
        { time: '10:00', title: 'Test RFID Readers', priority: 'normal' },
        { time: '12:00', title: 'Database Backup', priority: 'normal' },
        { time: '14:00', title: 'Kalibracja QR Scanner', priority: 'normal' },
        { time: '16:30', title: 'Performance Monitor', priority: 'low' },
        { time: '18:00', title: 'Evening Cleanup', priority: 'normal' }
      ],
      1: [ // Tuesday
        { time: '07:30', title: 'Hardware Diagnostics', priority: 'high' },
        { time: '09:00', title: 'Service Health Check', priority: 'normal' },
        { time: '11:00', title: 'User Access Audit', priority: 'normal' },
        { time: '13:30', title: 'Network Security Scan', priority: 'normal' },
        { time: '15:00', title: 'Barcode Test Sequence', priority: 'normal' },
        { time: '17:00', title: 'Log Analysis', priority: 'low' }
      ],
      2: [ // Wednesday
        { time: '08:30', title: 'Temperature Monitoring', priority: 'normal' },
        { time: '10:00', title: 'Critical System Update', priority: 'high' },
        { time: '11:00', title: 'Backup Verification', priority: 'normal' },
        { time: '13:00', title: 'Device Calibration', priority: 'normal' },
        { time: '15:30', title: 'Network Connectivity', priority: 'normal' },
        { time: '17:30', title: 'Weekly Status Report', priority: 'normal' }
      ],
      3: [ // Thursday
        { time: '08:00', title: 'Morning System Check', priority: 'normal' },
        { time: '09:30', title: 'Security Patch Install', priority: 'high' },
        { time: '11:30', title: 'I / O Port Testing', priority: 'normal' },
        { time: '14:00', title: 'Performance Optimization', priority: 'normal' },
        { time: '16:00', title: 'Data Integrity Check', priority: 'normal' },
        { time: '18:00', title: 'Maintenance Tasks', priority: 'low' }
      ],
      4: [ // Friday
        { time: '08:00', title: 'Week Summary Prep', priority: 'normal' },
        { time: '10:00', title: 'Full System Diagnostic', priority: 'normal' },
        { time: '12:00', title: 'Weekly Full Backup', priority: 'high' },
        { time: '14:30', title: 'Equipment Inspection', priority: 'normal' },
        { time: '16:00', title: 'Weekly Report Generation', priority: 'normal' },
        { time: '17:00', title: 'System Optimization', priority: 'normal' },
        { time: '19:00', title: 'Weekend Prep Checklist', priority: 'low' }
      ],
      5: [ // Saturday
        { time: '10:00', title: 'Light Maintenance', priority: 'low' },
        { time: '14:00', title: 'System Status Check', priority: 'low' },
        { time: '16:00', title: 'Weekend Monitoring', priority: 'low' }
      ],
      6: [ // Sunday
        { time: '12:00', title: 'Automated Backup', priority: 'low' },
        { time: '15:00', title: 'Weekly Stats Summary', priority: 'low' },
        { time: '18:00', title: 'Next Week Planning', priority: 'low' }
      ]
    };

    return tasksByDay[dayIndex] || [];
  }

  private getWeekRangeText(): string {
    const weekEnd = new Date(this.currentWeek);
    weekEnd.setDate(this.currentWeek.getDate() + 6);

    const monthNames = [
      'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
      'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
    ];

    const startDay = this.currentWeek.getDate();
    const endDay = weekEnd.getDate();
    const startMonth = monthNames[this.currentWeek.getMonth()];
    const endMonth = monthNames[weekEnd.getMonth()];
    const year = this.currentWeek.getFullYear();

    if (this.currentWeek.getMonth() === weekEnd.getMonth()) {
      return `Tydzień: ${startDay}-${endDay} ${startMonth} ${year}`;
    } else {
      return `Tydzień: ${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    }
  }

  public setupEventListeners(container: HTMLElement): void {
    const prevWeekBtn = container.querySelector('#prev - week');
    const nextWeekBtn = container.querySelector('#next - week');

    if (prevWeekBtn) {
      prevWeekBtn.addEventListener('click', () => {
        this.changeWeek(-7);
        this.refreshView(container);
      });
    }

    if (nextWeekBtn) {
      nextWeekBtn.addEventListener('click', () => {
        this.changeWeek(7);
        this.refreshView(container);
      });
    }
  }

  private changeWeek(days: number): void {
    this.currentWeek.setDate(this.currentWeek.getDate() + days);
  }

  private refreshView(container: HTMLElement): void {
    const weekViewElement = container.querySelector('.week - view - component');
    if (weekViewElement) {
      weekViewElement
        .innerHTML = this
        .render()
        .replace('<div class="week - view - component">', '')
        .replace('</div>', '');
      this.setupEventListeners(container);
    }
  }

  public getStyles(): string {
    return `
      /* Week View Component Styles */
      .week - view - component {
        width: 100%;
      }

      .week - navigation {
        display: flex;
        justify - content: space - between;
        align - items: center;
        margin - bottom: 15px;
        padding: 10px;
        background: #f8f9fa;
        border - radius: 6px;
        border: 1px solid #e0e0e0;
      }

      .btn - nav - week {
        display: flex;
        align - items: center;
        gap: 6px;
        padding: 8px 12px;
        background: linear - gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border - radius: 4px;
        cursor: pointer;
        font - size: 11px;
        transition: all 0.2s;
      }

      .btn - nav - week:hover {
        background: linear - gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        transform: translateY(-1px);
      }

      .current - week - display {
        font - size: 14px;
        font - weight: 600;
        color: #333;
      }

      .calendar - week {
        background: white;
        border - radius: 8px;
        border: 1px solid #e0e0e0;
        overflow: hidden;
      }

      .week - grid {
        display: grid;
        grid - template - columns: repeat(7, 1fr);
        gap: 1px;
        background: #e0e0e0;
      }

      .day - column {
        background: white;
        min - height: 250px;
        display: flex;
        flex - direction: column;
      }

      .day - header {
        background: #f8f9fa;
        padding: 8px 6px;
        text - align: center;
        font - size: 11px;
        font - weight: 600;
        color: #333;
        border - bottom: 1px solid #e0e0e0;
      }

      .day - date {
        display: block;
        font - size: 14px;
        font - weight: 700;
        color: #6366f1;
        margin - top: 2px;
      }

      .day - content {
        flex: 1;
        padding: 6px;
        display: flex;
        flex - direction: column;
        gap: 4px;
      }

      .task - item {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border - radius: 4px;
        padding: 6px 8px;
        font - size: 10px;
        line - height: 1.3;
        transition: all 0.2s;
        cursor: pointer;
      }

      .task - item:hover {
        background: #e9ecef;
        border - color: #6366f1;
        transform: translateY(-1px);
      }

      .task - item.high {
        background: #fef2f2;
        border - color: #fca5a5;
        color: #dc2626;
      }

      .task - item.medium {
        background: #fffbeb;
        border - color: #fcd34d;
        color: #d97706;
      }

      .task - item.low {
        background: #f0fdf4;
        border - color: #86efac;
        color: #059669;
      }
    `;
  }
}
