import { Component, inject, signal } from '@angular/core';

import { UserService } from '../../services/user.service';
import { usersSignal } from '../../utils/users.store';

@Component({
  selector: 'app-load-users-button',
  imports: [],
  templateUrl: './load-users-button.component.html',
  styleUrl: './load-users-button.component.scss',
})
export class LoadUsersButtonComponent {
  // 🔁 Сигнал состояния загрузки
  isLoading = signal(false);

  // 🔁 Инжектим сервис напрямую без конструктора
  private userService = inject(UserService);

  // 🔁 Метод загрузки пользователей
  loadUsers() {
    this.isLoading.set(true);

    this.userService.fetchUsers(5).subscribe({
      next: (users) => {
        // Добавляем новых пользователей к текущему списку
        usersSignal.update((prev) => [...prev, ...users]);
      },
      error: (error) => {
        console.error('Ошибка загрузки пользователей:', error);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
