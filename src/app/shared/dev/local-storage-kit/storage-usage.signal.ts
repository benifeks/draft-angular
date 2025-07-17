import {
  computed,
  effect,
  EnvironmentInjector,
  runInInjectionContext,
  signal,
} from '@angular/core';

/**
 * Подсчитывает общий объём занятого пространства в localStorage (в байтах).
 * Каждый символ в localStorage кодируется в UTF-16, т.е. занимает 2 байта.
 */
function calculateLocalStorageUsage(): number {
  let totalBytes = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) ?? '';
    const value = localStorage.getItem(key) ?? '';
    totalBytes += (key.length + value.length) * 2;
  }

  return totalBytes;
}

/**
 * Максимально допустимый объём localStorage (обычно 5 МБ = 5 * 1024 * 1024 байт).
 */
const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Writable сигнал, отражающий текущую заполненность хранилища в байтах.
 */
export const localStorageUsage = signal(calculateLocalStorageUsage());

/**
 * Вычисляемый сигнал — процент использования localStorage от MAX_BYTES.
 * Ограничен 100%.
 */
export const localStorageUsagePercent = computed(() =>
  Math.min((localStorageUsage() / MAX_BYTES) * 100, 100)
);

/**
 * Инициализирует эффект отслеживания состояния localStorage.
 * Включает:
 * - Реактивный эффект (для Angular-контекста)
 * - Интервал опроса (каждую секунду)
 */
export function initializeStorageUsageSignal(
  injector: EnvironmentInjector
): void {
  runInInjectionContext(injector, () => {
    // Эффект (на случай прямой мутации сигнала где-либо ещё)
    effect(() => {
      localStorageUsage.set(calculateLocalStorageUsage());
    });

    // Интервал для надёжного обновления каждый 1 сек.
    setInterval(() => {
      localStorageUsage.set(calculateLocalStorageUsage());
    }, 1000);
  });
}
