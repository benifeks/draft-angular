import { Component, signal } from '@angular/core';

import { STORAGE_UNIT_KEY_PREFIX, STORAGE_UNIT_VALUE } from '../storage-unit';
import { localStorageUsage } from '../storage-usage.signal';

@Component({
  selector: 'app-storage-simulator',
  imports: [],
  templateUrl: './storage-simulator.component.html',
  styleUrl: './storage-simulator.component.scss',
})
export class StorageSimulatorComponent {
  // Сигнал для отслеживания количества симулированных процентов
  public readonly percentToFill = signal(0);

  // Увеличить заполнение на 1%
  public incrementPercent(): void {
    const next = this.percentToFill() + 1;
    if (next <= 100) {
      this.percentToFill.set(next);
      this.writeUnit(next - 1);
    }
  }

  // Уменьшить заполнение на 1%
  public decrementPercent(): void {
    const next = this.percentToFill() - 1;
    if (next >= 0) {
      this.removeUnit(next);
      this.percentToFill.set(next);
    }
  }

  // Сброс всех симулированных данных
  public resetSimulation(): void {
    for (let i = 0; i < 100; i++) {
      localStorage.removeItem(`${STORAGE_UNIT_KEY_PREFIX}${i}`);
    }
    this.percentToFill.set(0);
    localStorageUsage.set(this.calculateLocalStorageUsage());
  }

  // Добавление единицы в localStorage
  private writeUnit(index: number): void {
    try {
      localStorage.setItem(
        `${STORAGE_UNIT_KEY_PREFIX}${index}`,
        STORAGE_UNIT_VALUE
      );
      localStorageUsage.set(this.calculateLocalStorageUsage());
    } catch (e) {
      console.warn('⚠️ Не удалось записать в localStorage:', e);
    }
  }

  // Удаление единицы из localStorage
  private removeUnit(index: number): void {
    localStorage.removeItem(`${STORAGE_UNIT_KEY_PREFIX}${index}`);
    localStorageUsage.set(this.calculateLocalStorageUsage());
  }

  // Подсчёт общего использования localStorage
  private calculateLocalStorageUsage(): number {
    let totalBytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) ?? '';
      const value = localStorage.getItem(key) ?? '';
      totalBytes += (key.length + value.length) * 2;
    }
    return totalBytes;
  }
}
