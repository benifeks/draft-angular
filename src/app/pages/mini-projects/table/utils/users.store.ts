import { signal } from '@angular/core';

import { User } from '../types/user.types';

// 1️⃣ Создаём сигнал — аналог useState([]) в React
export const usersSignal = signal<User[]>([]);
