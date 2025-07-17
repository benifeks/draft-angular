import { DecimalPipe, NgClass } from '@angular/common';
import { Component, computed } from '@angular/core';

import { localStorageUsagePercent } from '../storage-usage.signal';

@Component({
  selector: 'app-storage-indicator',
  imports: [DecimalPipe, NgClass],
  templateUrl: './storage-indicator.component.html',
  styleUrl: './storage-indicator.component.scss',
})
export class StorageIndicatorComponent {
  public readonly usagePercent = localStorageUsagePercent;

  private readonly radius = 45;
  public readonly circumference = 2 * Math.PI * this.radius;

  public readonly dashOffset = computed(() => {
    const percent = this.usagePercent();
    return this.circumference * (1 - percent / 100);
  });

  /**
   * Определяет класс для цвета прогресса:
   * - До 50%: зелёный
   * - 50–80%: оранжевый
   * - 80–100%: красный
   */
  public readonly strokeClass = computed(() => {
    const percent = this.usagePercent();
    if (percent < 50) return 'indicator-low';
    if (percent < 80) return 'indicator-medium';
    return 'indicator-high';
  });
}
