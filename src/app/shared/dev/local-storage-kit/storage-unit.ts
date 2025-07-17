/**
 * dev/local-storage-kit/storage-unit.ts
 * Размер одного блока localStorage для симуляции — примерно 1% от 5MB.
 * UTF-16: 2 байта на символ → 51_200 байт = 25_600 символов
 */
const UNIT_SIZE_BYTES = 51_200;

export const STORAGE_UNIT_KEY_PREFIX = 'storage-unit-';

/**
 * Единица заполнения localStorage (примерно 1%)
 * Используется в симуляторе для точного контроля объёма.
 */
export const STORAGE_UNIT_VALUE = 'x'.repeat(UNIT_SIZE_BYTES / 2);
