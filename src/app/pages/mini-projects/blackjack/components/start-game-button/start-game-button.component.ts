import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { DeckService } from '../../services/deck.service';
import { GameStateService } from '../../services/game-state.service';
import { initializeHands } from '../../utils/init.utils';

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
              // 🛠️ Инициализируем руки и очки
              const {
                playerCards,
                dealerCards,
                playerScore,
                dealerScore,
                //hideDealerScore,
              } = initializeHands(cards, this.gameStateService);

              // 🧠 Обновляем состояние игры
              this.gameStateService.setPlayerCards(playerCards);
              this.gameStateService.setDealerCards(dealerCards);
              this.gameStateService.setPlayerScore(playerScore);
              this.gameStateService.setDealerScore(dealerScore);

              // ❔ Можно использовать hideDealerScore для управления отображением
              // this.gameStateService.setHideDealerScore(hideDealerScore);
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
