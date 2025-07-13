import { take } from 'rxjs/operators';

import { DeckService } from '../deck.service';
import { GameStateService } from '../game-state.service';

import { finalizeGameState } from './finalize.utils';
import { calculateScore } from './score.utils';

/**
 * 💳 Добор карты игроком:
 * - Берёт 1 карту из колоды
 * - Обновляет карты и очки игрока
 * - Проверяет перебор / 21 / продолжение игры
 * - Обновляет состояния интерфейса
 *
 * @param deckId ID текущей колоды
 * @param deckService Сервис работы с колодой
 * @param gameStateService Сервис централизованного состояния игры
 */
export function drawCard(
  deckService: DeckService,
  gameStateService: GameStateService,
  deckId: string
): void {
  deckService.drawCards(deckId, 1).subscribe({
    next: ([newCard]) => {
      // Берём текущее значение карт игрока из observable (разовый снимок)
      gameStateService.playerCards$.pipe(take(1)).subscribe((currentCards) => {
        const updatedCards = [...currentCards, newCard];

        const newScore = calculateScore(updatedCards);

        // 📝 Обновляем состояние игрока
        gameStateService.setPlayerCards(updatedCards);
        gameStateService.setPlayerScore(newScore);

        if (newScore > 21) {
          gameStateService.setGameResult('💥 Перебор! Победа дилера');
          finalizeGameState(gameStateService);
          return;
        }
        if (newScore === 21) {
          gameStateService.setCanDrawCard(false);
          gameStateService.setGameResult('🟡 У вас 21 — пора нажать "Пас"');
          return;
        }
        gameStateService.setCanDrawCard(true);
        gameStateService.setCanPass(true);
        gameStateService.setCanStartGame(false);
      });
    },
    error: (err) => {
      console.error('❌ Ошибка при доборе карты:', err);
    },
  });
}
