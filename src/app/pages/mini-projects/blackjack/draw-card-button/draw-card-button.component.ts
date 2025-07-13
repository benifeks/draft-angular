import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { take } from 'rxjs';

import { DeckService } from '../services/deck.service';
import { GameStateService } from '../services/game-state.service';
import { drawCard } from '../services/utils/drawCard.utils';

@Component({
  selector: 'app-draw-card-button',
  imports: [CommonModule],
  templateUrl: './draw-card-button.component.html',
  styleUrl: './draw-card-button.component.scss',
})
export class DrawCardButtonComponent {
  private readonly deckService = inject(DeckService);
  protected readonly gameStateService = inject(GameStateService);

  protected readonly canDrawCard$ = this.gameStateService.canDrawCard$;

  /**
   * Обработка клика — добор карты игроком
   */
  public onDrawCard(): void {
    this.gameStateService.deckId$.pipe(take(1)).subscribe((deckId) => {
      if (deckId) {
        drawCard(this.deckService, this.gameStateService, deckId);
      } else {
        console.error('❌ Deck ID отсутствует');
      }
    });
  }
}
