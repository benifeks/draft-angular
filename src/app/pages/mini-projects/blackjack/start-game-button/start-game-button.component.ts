import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { DeckService } from '../services/deck.service';
import { GameStateService } from '../services/game-state.service';
import { initializeHands } from '../services/utils/init.utils';

@Component({
  selector: 'app-start-game-button',
  imports: [CommonModule],
  templateUrl: './start-game-button.component.html',
  styleUrl: './start-game-button.component.scss',
})
export class StartGameButtonComponent {
  private readonly deckService = inject(DeckService);
  public readonly gameStateService = inject(GameStateService);

  /**
   * Запускает новую игру:
   * - создаёт новую колоду
   * - берёт 4 карты
   * - распределяет карты по рукам
   * - считает очки
   * - обновляет состояние игры
   */
  public startGame(): void {
    this.deckService.newDeck().subscribe({
      next: (deckId) => {
        this.gameStateService.setDeckId(deckId);

        this.deckService.drawCards(deckId, 4).subscribe({
          next: (cards) => {
            try {
              const {
                playerCards,
                dealerCards,
                playerScore,
                dealerScore,
                hideDealerScore,
              } = initializeHands(cards);

              this.gameStateService.setPlayerCards(playerCards);
              this.gameStateService.setDealerCards(dealerCards);
              this.gameStateService.setPlayerScore(playerScore);
              this.gameStateService.setDealerScore(dealerScore);

              // (опционально) скрытие очков дилера можно хранить
              // this.gameStateService.setHideDealerScore(hideDealerScore);

              // 🎯 сюда можно добавить: смена статуса игры, разрешение действий и т.д.
            } catch (error) {
              console.error('❌ Ошибка инициализации карт:', error);
            }
          },
          error: (err) => {
            console.error('❌ Ошибка при вытягивании карт:', err);
          },
        });
      },
      error: (err) => {
        console.error('❌ Ошибка при создании колоды:', err);
      },
    });
  }
}
