import { Card } from '../deck.service';

import { calculateScore } from './score.utils';

/**
 * Инициализация стартовой руки:
 * 2 карты игроку, 2 дилеру
 * Подсчёт очков обеих сторон
 */
export function initializeHands(cards: Card[]): {
  playerCards: Card[];
  dealerCards: Card[];
  playerScore: number;
  dealerScore: number;
  hideDealerScore: boolean;
} {
  if (cards.length < 4) {
    throw new Error(
      'Недостаточно карт для инициализации игры (нужно минимум 4)'
    );
  }

  const playerCards = cards.slice(0, 2);
  const dealerCards = cards.slice(2, 4);

  const playerScore = calculateScore(playerCards);
  const dealerScore = calculateScore(dealerCards);

  // 🚀 Логируем в консоль
  console.log('🎲 Игрок получил карты:', playerCards);
  console.log('🧮 Очки игрока:', playerScore);

  console.log('🎲 Дилер получил карты:', dealerCards);
  console.log('🧮 Очки дилера (оба):', dealerScore);

  return {
    playerCards,
    dealerCards,
    playerScore,
    dealerScore,
    hideDealerScore: true, // скрываем до завершения игры
  };
}
