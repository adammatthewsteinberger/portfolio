import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver as a class
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // Mock implementation - parameters intentionally unused
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver as a class
class MockResizeObserver implements ResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(callback: ResizeObserverCallback) {
    // Mock implementation - parameter intentionally unused
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

global.ResizeObserver = MockResizeObserver;

// Mock localStorage with proper behavior
const localStorageStore: Record<string, string> = {};
const localStorageMock: Storage = {
  getItem: vi.fn((key: string) => localStorageStore[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageStore[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageStore[key];
  }),
  clear: vi.fn(() => {
    Object.keys(localStorageStore).forEach(key => delete localStorageStore[key]);
  }),
  length: 0,
  key: vi.fn((index: number) => Object.keys(localStorageStore)[index] ?? null),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock gtag for Google Analytics
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).gtag = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).dataLayer = [];

// Suppress console errors in tests (optional, comment out for debugging)
// vi.spyOn(console, 'error').mockImplementation(() => {});
