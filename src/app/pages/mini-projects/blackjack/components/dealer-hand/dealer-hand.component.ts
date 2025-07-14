import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';

import { Card } from '../../services/deck.service';
import { GameStateService } from '../../services/game-state.service';
import { CARD_BACK_URL } from '../../utils/constants';

@Component({
  selector: 'app-dealer-hand',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './dealer-hand.component.html',
  styleUrl: './dealer-hand.component.scss',
})
export class DealerHandComponent {
  private readonly gameStateService = inject(GameStateService);

  public readonly CARD_BACK_URL = CARD_BACK_URL;

  /**
   * Возвращает массив отображаемых карт дилера.
   * Если флаг hideDealerCard$ активен, первая карта будет скрыта (заменена на "back").
   */
  public readonly visibleCards$: Observable<(Card | 'back')[]> = combineLatest([
    this.gameStateService.dealerCards$,
    this.gameStateService.hideDealerCard$,
  ]).pipe(
    map(([cards, hideFirstCard]) => {
      if (!cards.length) return [];

      if (hideFirstCard) {
        return ['back', ...cards.slice(1)];
      }

      return cards;
    })
  );

  /**
   * trackBy функция для оптимизации рендера списка карт.
   * Если карта скрыта — используем строку 'back', иначе уникальный код карты.
   */
  public trackByCard(index: number, card: Card | 'back'): string {
    return card === 'back' ? `back-${index}` : card.code;
  }
}
