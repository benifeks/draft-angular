import { Component, EnvironmentInjector, inject } from '@angular/core';

import { StorageIndicatorComponent } from './storage-indicator/storage-indicator.component';
import { StorageSimulatorComponent } from './storage-simulator/storage-simulator.component';
import { initializeStorageUsageSignal } from './storage-usage.signal';

@Component({
  selector: 'app-local-storage-kit',
  imports: [StorageIndicatorComponent, StorageSimulatorComponent],
  templateUrl: './local-storage-kit.component.html',
  styleUrl: './local-storage-kit.component.scss',
})
export class LocalStorageKitComponent {
  constructor() {
    // Инициализируем сигнал отслеживания заполненности localStorage
    // Передаём EnvironmentInjector для запуска эффекта и интервала в DI-контексте
    initializeStorageUsageSignal(inject(EnvironmentInjector));
  }
}
