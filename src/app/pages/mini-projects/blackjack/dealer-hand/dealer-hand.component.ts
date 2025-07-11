import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CARD_BACK_URL } from '../constants';
import { Card } from '../services/deck.service';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-dealer-hand',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './dealer-hand.component.html',
  styleUrl: './dealer-hand.component.scss',
})
export class DealerHandComponent {
  private readonly gameStateService = inject(GameStateService);

  public readonly CARD_BACK_URL = CARD_BACK_URL;

  public readonly visibleCards$: Observable<(Card | 'back')[]> =
    this.gameStateService.dealerCards$.pipe(
      map((cards) => {
        if (cards.length === 0) return [];
        if (cards.length === 2) return ['back', cards[1]]; // первая карта скрыта
        return cards;
      })
    );
}
