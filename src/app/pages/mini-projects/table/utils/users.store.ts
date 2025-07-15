// users.store.ts
import { signal } from '@angular/core';

import { User } from '../types/user.types';

// Основные сигналы
export const usersSignal = signal<User[]>([]);
export const selectedUserSignal = signal<User | null>(null);
export const checkedUsersSignal = signal<User[]>([]);

// Обёртка с методами
export const UsersStore = {
  // 👉 Очистить всех пользователей
  clearAll() {
    usersSignal.set([]);
    selectedUserSignal.set(null);
    checkedUsersSignal.set([]);
  },

  // ❌ Удалить одного
  removeUser(uuid: string) {
    usersSignal.update((users) => users.filter((u) => u.login.uuid !== uuid));
    checkedUsersSignal.update((users) =>
      users.filter((u) => u.login.uuid !== uuid)
    );
    if (selectedUserSignal()?.login.uuid === uuid) {
      selectedUserSignal.set(null);
    }
  },

  // ✅ Добавить пачку
  addMany(users: User[]) {
    usersSignal.update((prev) => [...prev, ...users]);
  },

  // 📌 Выбрать пользователя
  selectUser(user: User | null) {
    selectedUserSignal.set(user);
  },

  // ✅ Выделить чекбоксом
  toggleCheckedUser(user: User) {
    checkedUsersSignal.update((prev) => {
      const exists = prev.some((u) => u.login.uuid === user.login.uuid);
      return exists
        ? prev.filter((u) => u.login.uuid !== user.login.uuid)
        : [...prev, user];
    });
  },
};
