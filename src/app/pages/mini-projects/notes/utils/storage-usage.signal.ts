// notes/utils/storage-usage.signal.ts

import {
  computed,
  effect,
  EnvironmentInjector,
  runInInjectionContext,
  signal,
} from '@angular/core';

/**
 * Считает текущий размер занимаемого localStorage в байтах.
 */
function calculateLocalStorageUsage(): number {
  let totalBytes = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) ?? '';
    const value = localStorage.getItem(key) ?? '';
    totalBytes += (key.length + value.length) * 2; // UTF-16: 2 байта на символ
  }
  return totalBytes;
}

// Writable сигнал, который содержит текущую заполненность localStorage в байтах
export const localStorageUsage = signal(calculateLocalStorageUsage());

// Максимально допустимый объём localStorage (5 МБ)
const MAX_BYTES = 5 * 1024 * 1024;

// Вычисляем процент использования
export const localStorageUsagePercent = computed(() =>
  Math.min((localStorageUsage() / MAX_BYTES) * 100, 100)
);

// Периодически обновляем usage
export function initializeStorageUsageSignal(
  injector: EnvironmentInjector
): void {
  runInInjectionContext(injector, () => {
    effect(() => {
      localStorageUsage.set(calculateLocalStorageUsage());
    });
  });
}
