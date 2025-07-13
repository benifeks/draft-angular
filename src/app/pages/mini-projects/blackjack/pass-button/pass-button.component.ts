import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { take } from 'rxjs';

import { DeckService } from '../services/deck.service';
import { GameStateService } from '../services/game-state.service';
import { dealerDrawUntil17 } from '../services/utils/dealer.utils';
import { finalizeGameState } from '../services/utils/finalize.utils';
import { calculateScore } from '../services/utils/score.utils';

@Component({
  selector: 'app-pass-button',
  imports: [CommonModule],
  templateUrl: './pass-button.component.html',
  styleUrl: './pass-button.component.scss',
})
export class PassButtonComponent {
  private readonly deckService = inject(DeckService);
  public readonly gameStateService = inject(GameStateService);

  /**
   * Обработка "Пас":
   * - дилер добирает карты до 17
   * - вычисляются очки дилера
   * - сравнение очков дилера и игрока
   * - финализация состояния
   */
  public onPass(): void {
    this.gameStateService.deckId$.pipe(take(1)).subscribe((deckId) => {
      if (!deckId) return;

      dealerDrawUntil17(this.deckService, this.gameStateService, deckId, () => {
        this.gameStateService.dealerCards$
          .pipe(take(1))
          .subscribe((dealerCards) => {
            const dealerScore = calculateScore(dealerCards);
            this.gameStateService.setDealerScore(dealerScore);

            this.gameStateService.playerScore$
              .pipe(take(1))
              .subscribe((playerScore) => {
                // открываем карты дилера и сравниваем очки
                finalizeGameState(this.gameStateService);
                if (dealerScore > 21) {
                  this.gameStateService.setGameResult(
                    '🎉 Дилер перебрал — победа игрока'
                  );
                  return;
                }
                if (dealerScore > playerScore) {
                  this.gameStateService.setGameResult('💼 Победа дилера');
                  return;
                }
                if (dealerScore < playerScore) {
                  this.gameStateService.setGameResult('🎉 Победа игрока');
                  return;
                }
                this.gameStateService.setGameResult('🤝 Ничья');
              });
          });
      });
    });
  }
}
