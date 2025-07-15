import { Component, computed } from '@angular/core';

import { User } from '../../types/user.types';
import {
  checkedUsersSignal,
  selectedUserSignal,
  usersSignal,
} from '../../utils/users.store';

@Component({
  selector: 'app-users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  // 👁️ Используется в шаблоне => public
  public readonly users = computed(() => usersSignal());
  public readonly checkedUsers = computed(() => checkedUsersSignal());

  // ❌ Удалить пользователя
  public remove(uuid: string): void {
    usersSignal.update((prev) => prev.filter((u) => u.login.uuid !== uuid));
    checkedUsersSignal.update((prev) =>
      prev.filter((u) => u.login.uuid !== uuid)
    );
  }

  // ℹ️ Показать детали
  public show(user: User): void {
    selectedUserSignal.set(user);
  }

  // ✅ Переключить чекбокс
  public toggleCheck(user: User): void {
    checkedUsersSignal.update((prev) => {
      const exists = prev.some((u) => u.login.uuid === user.login.uuid);
      return exists
        ? prev.filter((u) => u.login.uuid !== user.login.uuid)
        : [...prev, user];
    });
  }

  // ✅ Проверка, выбран ли пользователь
  public isChecked(userUuid: string): boolean {
    return this.checkedUsers().some((u) => u.login.uuid === userUuid);
  }
}
