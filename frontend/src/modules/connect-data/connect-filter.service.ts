// frontend/src/modules/connect-data/connect-data.service.ts
interface ConnectFilterConfiguration {
  itemsPerPage?: number;
  enableAdvancedFilters?: boolean;
  enableExport?: boolean;
}

interface FilterCriteria {
  textSearch?: string;
  deviceType?: string;
  status?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  location?: string;
  group?: string;
}

interface SearchResult {
  id: string;
  name: string;
  type: string;
  status: string;
  location?: string;
  group?: string;
  lastSeen?: Date;
  metadata: Record<string, any>;
}

export class ConnectFilterService {
  private config: ConnectFilterConfiguration;
  private initialized: boolean = false;
  private currentFilters: FilterCriteria = {};
  private searchResults: SearchResult[] = [];
  // private currentView: string = 'devices'; // TODO: implement view switching
  private sortBy: string = 'name';
  private sortDirection: 'asc' | 'desc' = 'asc';
  private currentPage: number = 1;

  constructor(config?: ConnectFilterConfiguration) {
    this.config = {
      itemsPerPage: 20,
      enableAdvancedFilters: true,
      enableExport: false,
      ...config
    };
  }

  async initialize(): Promise<void> {
    console.log('🔧 Initializing ConnectFilterService...');
    console.log('Config:', this.config);
    
    // Load demo data
    this.loadDemoData();
    
    this.initialized = true;
    console.log('✅ ConnectFilterService initialized');
  }

  async destroy(): Promise<void> {
    console.log('🔧 Destroying ConnectFilterService...');
    
    // Clean up any resources
    this.searchResults = [];
    this.currentFilters = {};
    
    this.initialized = false;
    console.log('✅ ConnectFilterService destroyed');
  }

  isHealthy(): boolean {
    return this.initialized;
  }

  /**
   * Perform search with current filters
   */
  async performSearch(additionalFilters?: Partial<FilterCriteria>): Promise<SearchResult[]> {
    const filters = { ...this.currentFilters, ...additionalFilters };
    console.log('🔍 Performing search with filters:', filters);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      let results = this.getAllData();

      // Apply text search
      if (filters.textSearch) {
        const searchText = filters.textSearch.toLowerCase();
        results = results.filter(item => 
          item.name.toLowerCase().includes(searchText) ||
          item.id.toLowerCase().includes(searchText) ||
          item.type.toLowerCase().includes(searchText)
        );
      }

      // Apply device type filter
      if (filters.deviceType && filters.deviceType !== 'all') {
        results = results.filter(item => item.type === filters.deviceType);
      }

      // Apply status filter
      if (filters.status && filters.status !== 'all') {
        results = results.filter(item => item.status === filters.status);
      }

      // Apply location filter
      if (filters.location && filters.location !== 'all') {
        results = results.filter(item => item.location === filters.location);
      }

      // Apply group filter
      if (filters.group && filters.group !== 'all') {
        results = results.filter(item => item.group === filters.group);
      }

      // Apply date range filter
      if (filters.dateRange) {
        results = results.filter(item => {
          if (!item.lastSeen) return false;
          return item.lastSeen >= filters.dateRange!.from && 
                 item.lastSeen <= filters.dateRange!.to;
        });
      }

      // Apply sorting
      results.sort((a, b) => {
        let aValue = (a as any)[this.sortBy];
        let bValue = (b as any)[this.sortBy];

        if (aValue instanceof Date) aValue = aValue.getTime();
        if (bValue instanceof Date) bValue = bValue.getTime();

        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();

        if (this.sortDirection === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });

      this.searchResults = results;
      this.currentFilters = filters;

      // Trigger search event
      window.dispatchEvent(new CustomEvent('connectfilter:search-complete', {
        detail: { 
          results: this.getPagedResults(),
          totalCount: results.length,
          currentPage: this.currentPage,
          totalPages: this.getTotalPages()
        }
      }));

      return this.getPagedResults();
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  }

  /**
   * Get current search results with pagination
   */
  getPagedResults(): SearchResult[] {
    const startIndex = (this.currentPage - 1) * this.config.itemsPerPage!;
    const endIndex = startIndex + this.config.itemsPerPage!;
    return this.searchResults.slice(startIndex, endIndex);
  }

  /**
   * Get total pages count
   */
  getTotalPages(): number {
    return Math.ceil(this.searchResults.length / this.config.itemsPerPage!);
  }

  /**
   * Set current page
   */
  setPage(page: number): void {
    this.currentPage = Math.max(1, Math.min(page, this.getTotalPages()));
    
    window.dispatchEvent(new CustomEvent('connectfilter:page-changed', {
      detail: { 
        results: this.getPagedResults(),
        currentPage: this.currentPage,
        totalPages: this.getTotalPages()
      }
    }));
  }

  /**
   * Set sorting
   */
  setSorting(sortBy: string, direction: 'asc' | 'desc'): void {
    this.sortBy = sortBy;
    this.sortDirection = direction;
    this.performSearch(); // Re-search with new sorting
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.currentFilters = {};
    this.currentPage = 1;
    this.performSearch();
  }

  /**
   * Export current results
   */
  exportResults(format: 'csv' | 'excel' = 'csv'): string {
    if (!this.config.enableExport) {
      throw new Error('Export is disabled');
    }

    if (format === 'csv') {
      return this.exportToCSV();
    } else {
      throw new Error('Excel export not implemented yet');
    }
  }

  /**
   * Get available filter options
   */
  getFilterOptions(): {
    deviceTypes: string[];
    statuses: string[];
    locations: string[];
    groups: string[];
  } {
    const allData = this.getAllData();
    
    return {
      deviceTypes: [...new Set(allData.map(item => item.type))],
      statuses: [...new Set(allData.map(item => item.status))],
      locations: [...new Set(allData.map(item => item.location).filter(Boolean) as string[])],
      groups: [...new Set(allData.map(item => item.group).filter(Boolean) as string[])]
    };
  }

  /**
   * Get search statistics
   */
  getSearchStatistics(): {
    totalItems: number;
    filteredItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  } {
    return {
      totalItems: this.getAllData().length,
      filteredItems: this.searchResults.length,
      currentPage: this.currentPage,
      totalPages: this.getTotalPages(),
      itemsPerPage: this.config.itemsPerPage!
    };
  }

  /**
   * Load demo data for testing
   */
  private loadDemoData(): void {
    // This would normally come from an API
    // For now, we'll generate some demo data
  }

  /**
   * Get all available data (would normally be from API)
   */
  private getAllData(): SearchResult[] {
    // Demo data - in real implementation this would come from API
    return [
      {
        id: 'G1-001234',
        name: 'Test Device Alpha',
        type: 'Pressure Gauge',
        status: 'Active',
        location: 'Workshop A',
        group: 'Group 1',
        lastSeen: new Date('2025-10-08T09:00:00'),
        metadata: { calibrated: true, version: '1.2.3' }
      },
      {
        id: 'G1-001235',
        name: 'Test Device Beta',
        type: 'Flow Meter',
        status: 'Inactive',
        location: 'Workshop B',
        group: 'Group 1',
        lastSeen: new Date('2025-10-07T15:30:00'),
        metadata: { calibrated: false, version: '1.1.0' }
      },
      {
        id: 'G2-001100',
        name: 'Calibration Standard',
        type: 'Reference Device',
        status: 'Active',
        location: 'Laboratory',
        group: 'Group 2',
        lastSeen: new Date('2025-10-08T08:45:00'),
        metadata: { certified: true, expiry: '2026-01-01' }
      }
    ];
  }

  /**
   * Export results to CSV format
   */
  private exportToCSV(): string {
    const headers = ['ID', 'Name', 'Type', 'Status', 'Location', 'Group', 'Last Seen'];
    const rows = this.searchResults.map(item => [
      item.id,
      item.name,
      item.type,
      item.status,
      item.location || '',
      item.group || '',
      item.lastSeen ? item.lastSeen.toISOString() : ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    return csvContent;
  }
}
