import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';

import { selectedUserSignal } from '../../utils/users.store';

@Component({
  selector: 'app-user-details-card',
  imports: [CommonModule],
  templateUrl: './user-details-card.component.html',
  styleUrl: './user-details-card.component.scss',
})
export class UserDetailsCardComponent {
  user = computed(() => selectedUserSignal());

  close() {
    selectedUserSignal.set(null);
  }
}
