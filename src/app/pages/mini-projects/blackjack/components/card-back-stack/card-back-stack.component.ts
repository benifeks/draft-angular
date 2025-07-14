import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { GameStateService } from '../../services/game-state.service';
import { CARD_BACK_URL } from '../../utils/constants';

@Component({
  selector: 'app-card-back-stack',
  imports: [CommonModule],
  templateUrl: './card-back-stack.component.html',
  styleUrl: './card-back-stack.component.scss',
})
export class CardBackStackComponent {
  private readonly gameStateService = inject(GameStateService);
  public readonly CARD_BACK_URL = CARD_BACK_URL;

  /**
   * Вычисляем количество оставшихся карт:
   * 52 - (карты игрока + карты дилера)
   * Ограничиваем максимумом 10 для отображения
   */
  public readonly remainingStack$ = combineLatest([
    this.gameStateService.playerCards$,
    this.gameStateService.dealerCards$,
  ]).pipe(
    map(([player, dealer]) => {
      const remaining = Math.max(0, 52 - player.length - dealer.length);
      return Array.from({ length: remaining });
      // return Array.from({ length: Math.min(remaining, 10) });
    })
  );
}
