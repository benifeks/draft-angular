import { Component, computed } from '@angular/core';

import { usersSignal } from '../../utils/users.store';

@Component({
  selector: 'app-users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  // 💡 Геттер на массив пользователей (можно фильтровать/сортировать здесь)
  users = computed(() => usersSignal());

  // ❌ Удаление по uuid
  remove(uuid: string) {
    usersSignal.update((users) => users.filter((u) => u.login.uuid !== uuid));
  }
}
