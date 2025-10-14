// frontend/src/core/__tests__/module-loader.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ModuleLoader } from '../module-loader/module-loader';

describe('ModuleLoader', () => {
  let loader: ModuleLoader;

  beforeEach(() => {
    loader = new ModuleLoader();
  });

  describe('register()', () => {
    it('should register a module', () => {
      loader.register('test-module', './test-module');
      
      expect(loader.getRegisteredModules()).toContain('test-module');
    });

    it('should register multiple modules', () => {
      loader.register('module1', './module1');
      loader.register('module2', './module2');
      
      const modules = loader.getRegisteredModules();
      expect(modules).toContain('module1');
      expect(modules).toContain('module2');
    });
  });

  describe('isLoaded()', () => {
    it('should return false for unloaded module', () => {
      loader.register('test-module', './test-module');
      
      expect(loader.isLoaded('test-module')).toBe(false);
    });

    it('should return false for unregistered module', () => {
      expect(loader.isLoaded('nonexistent')).toBe(false);
    });
  });

  describe('getRegisteredModules()', () => {
    it('should return empty array initially', () => {
      expect(loader.getRegisteredModules()).toEqual([]);
    });

    it('should return all registered module names', () => {
      loader.register('module1', './module1');
      loader.register('module2', './module2');
      loader.register('module3', './module3');
      
      const modules = loader.getRegisteredModules();
      expect(modules).toHaveLength(3);
      expect(modules).toEqual(['module1', 'module2', 'module3']);
    });
  });

  describe('getStats()', () => {
    it('should return stats with zero loaded initially', () => {
      loader.register('module1', './module1');
      loader.register('module2', './module2');
      
      const stats = loader.getStats();
      
      expect(stats.total).toBe(2);
      expect(stats.loaded).toBe(0);
      expect(stats.loading).toBe(0);
    });
  });

  describe('getInstance()', () => {
    it('should return undefined for unloaded module', () => {
      loader.register('test-module', './test-module');
      
      expect(loader.getInstance('test-module')).toBeUndefined();
    });

    it('should return undefined for unregistered module', () => {
      expect(loader.getInstance('nonexistent')).toBeUndefined();
    });
  });

  describe('unload()', () => {
    it('should not throw for unregistered module', () => {
      expect(() => loader.unload('nonexistent')).not.toThrow();
    });

    it('should mark module as unloaded', () => {
      loader.register('test-module', './test-module');
      loader.unload('test-module');
      
      expect(loader.isLoaded('test-module')).toBe(false);
    });
  });
});
