import { GameStateService } from '../services/game-state.service';

/**
 * Завершает раунд игры:
 * - отключает кнопки "Взять карту" и "Пас"
 * - активирует кнопку "Начать игру"
 * - показывает скрытые элементы дилера (первая карта и очки)
 */
export function finalizeGameState(gameStateService: GameStateService): void {
  gameStateService.setCanDrawCard(false);
  gameStateService.setCanPass(false);
  gameStateService.setCanStartGame(true);
  gameStateService.setHideDealerCard(false);
  gameStateService.setHideDealerScore(false);
}
