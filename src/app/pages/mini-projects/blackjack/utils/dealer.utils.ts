import { take } from 'rxjs';

import { DeckService } from '../services/deck.service';
import { GameStateService } from '../services/game-state.service';

import { calculateScore } from './score.utils';

/**
 * Добор карт дилером до 17 очков включительно.
 * @param deckService Сервис API колоды
 * @param gameStateService Состояние игры
 * @param deckId ID текущей колоды
 * @param onComplete Колбэк при завершении (опционально)
 */
export function dealerDrawUntil17(
  deckService: DeckService,
  gameStateService: GameStateService,
  deckId: string,
  onComplete?: () => void
): void {
  // Берём текущие карты дилера однократно из Observable
  gameStateService.dealerCards$.pipe(take(1)).subscribe((initialCards) => {
    // Копируем массив карт (чтобы не мутировать исходный)
    const dealerCards = [...initialCards];
    let dealerScore = calculateScore(dealerCards);

    /**
     * Рекурсивная функция добора карты.
     * Если у дилера < 17 очков — тянем ещё карту.
     * Иначе — финализируем результат.
     */
    const drawNext = () => {
      if (dealerScore >= 17) {
        // ✅ Очков достаточно — обновляем финальное состояние
        gameStateService.setDealerCards(dealerCards);
        gameStateService.setDealerScore(dealerScore);
        onComplete?.(); // вызываем колбэк, если передан
        return;
      }

      // 🎯 Вытягиваем одну карту из колоды
      deckService.drawCards(deckId, 1).subscribe({
        next: ([newCard]) => {
          dealerCards.push(newCard); // добавляем в руку
          dealerScore = calculateScore(dealerCards); // пересчитываем очки
          drawNext(); // продолжаем добор, если нужно
        },
        error: (err) => {
          console.error('❌ Ошибка при доборе карт дилером:', err);
        },
      });
    };

    drawNext(); // запускаем добор
  });
}
