// frontend/src/tests/setup.ts
// Test setup file for Vitest

import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock console methods in tests
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
  log: vi.fn(),
  debug: vi.fn(),
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock window.location
delete (window as any).location;
window.location = {
  href: 'http://localhost/',
  pathname: '/',
  search: '',
  hash: '',
  origin: 'http://localhost',
  reload: vi.fn(),
} as any;

// Mock window.history
window.history.pushState = vi.fn();
window.history.replaceState = vi.fn();
