import {
  effect,
  EnvironmentInjector,
  runInInjectionContext,
  WritableSignal,
} from '@angular/core';

import {
  calculateLocalStorageUsage,
  localStorageUsage,
} from '../../../../shared/dev/local-storage-kit/storage-usage.signal';

export function syncSignalWithLocalStorage<T>(
  key: string,
  signal: WritableSignal<T>,
  injector: EnvironmentInjector
): void {
  // 1. Инициализация из localStorage
  const raw = localStorage.getItem(key);
  if (raw !== null) {
    try {
      const parsed = JSON.parse(raw) as T;
      signal.set(parsed);
    } catch {
      console.warn(`⚠️ Невозможно распарсить данные по ключу ${key}`);
    }
  }

  // 2. Эффект синхронизации
  runInInjectionContext(injector, () => {
    effect(() => {
      localStorage.setItem(key, JSON.stringify(signal()));

      // 🔄 Обновляем сигнал заполненности
      localStorageUsage.set(calculateLocalStorageUsage());
    });
  });
}
