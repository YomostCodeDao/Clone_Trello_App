// frontend/src/shared/utils/lazyLoadHelpers.ts
import { lazy } from 'react';
import type { ComponentType } from 'react';

// Helper to create lazy component
export function createLazyComponent<T extends ComponentType<unknown>>(
  importFunc: () => Promise<{ default: T }>
) {
  return lazy(importFunc);
}

// Preload function for optimization (call on hover, etc.)
export function preloadComponent(
  importFunc: () => Promise<{ default: ComponentType<unknown> }>
) {
  void importFunc();
}
