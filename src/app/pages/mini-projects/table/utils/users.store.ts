import { signal } from '@angular/core';

import { User } from '../types/user.types';

// 1️⃣ Создаём сигнал — аналог useState([]) в React
export const usersSignal = signal<User[]>([]);

// 🔥 Cигнал — текущий выбранный пользователь
export const selectedUserSignal = signal<User | null>(null);
