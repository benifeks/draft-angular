import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';

import { selectedUserSignal } from '../../utils/users.store';

@Component({
  selector: 'app-user-details-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details-card.component.html',
  styleUrl: './user-details-card.component.scss',
})
export class UserDetailsCardComponent {
  // 👁️ Используется в шаблоне
  public readonly user = computed(() => selectedUserSignal());

  // ❌ Закрыть модалку
  public close(): void {
    selectedUserSignal.set(null);
  }
}
