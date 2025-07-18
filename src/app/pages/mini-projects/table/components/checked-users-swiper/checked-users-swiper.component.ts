import {
  Component,
  computed,
  effect,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import { User } from '../../types/user.types';
import {
  checkedUsersSignal,
  selectedUserSignal,
} from '../../utils/users.store';

@Component({
  selector: 'app-checked-users-swiper',
  standalone: true,
  templateUrl: './checked-users-swiper.component.html',
  styleUrl: './checked-users-swiper.component.scss',
  imports: [],
  encapsulation: ViewEncapsulation.None,
})
export class CheckedUsersSwiperComponent implements OnDestroy {
  // Сигнал на выбранных пользователей (текущий слайдер)
  readonly users = computed(() => checkedUsersSignal());

  // Ссылка на DOM контейнер для Swiper
  @ViewChild('swiperContainer', { static: false })
  swiperContainer!: ElementRef<HTMLDivElement>;

  // Инстанс слайдера
  private swiper?: Swiper;

  // Эффект — реагирует на users() и инициализирует слайдер
  private destroyEffect = effect(() => {
    const users = this.users();

    // Если DOM контейнера нет — не инициализируем
    const container = this.swiperContainer?.nativeElement;
    if (!container) return;

    // Проверяем наличие внутреннего wrapper
    const wrapper = container.querySelector('.swiper-wrapper');
    if (!wrapper) return;

    // Уничтожаем старый слайдер (если есть)
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = undefined;
    }

    // Если нет пользователей — ничего не делаем
    if (users.length === 0) return;

    // Инициализация нового Swiper
    this.swiper = new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
      },
      breakpoints: {
        600: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  });

  // Показать детальную карточку пользователя (открыть модалку)
  show(user: User) {
    selectedUserSignal.set(user);
  }

  // Тоггл чекбокса пользователя — добавляем или удаляем из checkedUsersSignal
  toggleCheck(user: User) {
    checkedUsersSignal.update((prev) => {
      const exists = prev.some((u) => u.login.uuid === user.login.uuid);
      if (exists) {
        return prev.filter((u) => u.login.uuid !== user.login.uuid);
      } else {
        return [...prev, user];
      }
    });
  }

  // Очистка при уничтожении компонента
  ngOnDestroy() {
    this.swiper?.destroy(true, true);
    this.destroyEffect.destroy();
  }
}
