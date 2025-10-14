// frontend/src/core/__tests__/router.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Router } from '../router/router';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router();
    window.history.pushState({}, '', '/');
  });

  describe('register()', () => {
    it('should register a route', () => {
      const handler = vi.fn();
      router.register('/test', handler);
      
      router.navigateTo('/test');
      
      expect(handler).toHaveBeenCalled();
    });

    it('should register multiple routes', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      
      router.register('/route1', handler1);
      router.register('/route2', handler2);
      
      router.navigateTo('/route1');
      expect(handler1).toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
    });
  });

  describe('navigateTo()', () => {
    it('should navigate to registered route', () => {
      const handler = vi.fn();
      router.register('/test', handler);
      
      router.navigateTo('/test');
      
      expect(handler).toHaveBeenCalled();
      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/test');
    });

    it('should not navigate to same route twice', () => {
      const handler = vi.fn();
      router.register('/test', handler);
      
      router.navigateTo('/test');
      router.navigateTo('/test');
      
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should update current path', () => {
      const handler = vi.fn();
      router.register('/test', handler);
      
      router.navigateTo('/test');
      
      expect(router.getCurrentPath()).toBe('/test');
    });
  });

  describe('wildcard routes', () => {
    it('should match wildcard routes', () => {
      const handler = vi.fn();
      router.register('/users/*', handler);
      
      router.navigateTo('/users/123');
      
      expect(handler).toHaveBeenCalled();
    });

    it('should match default route', () => {
      const handler = vi.fn();
      router.register('*', handler);
      
      router.navigateTo('/any-route');
      
      expect(handler).toHaveBeenCalled();
    });
  });

  describe('getCurrentPath()', () => {
    it('should return current path', () => {
      const handler = vi.fn();
      router.register('/test', handler);
      router.navigateTo('/test');
      
      expect(router.getCurrentPath()).toBe('/test');
    });
  });

  describe('getParams()', () => {
    it('should return URL search params', () => {
      window.history.pushState({}, '', '/test?foo=bar&baz=qux');
      
      const params = router.getParams();
      
      expect(params.get('foo')).toBe('bar');
      expect(params.get('baz')).toBe('qux');
    });
  });

  describe('getHash()', () => {
    it('should return URL hash without #', () => {
      window.history.pushState({}, '', '/test#section');
      window.location.hash = '#section';
      
      const hash = router.getHash();
      
      expect(hash).toBe('section');
    });
  });
});
