import { Card } from '../services/deck.service';

/**
 * Возвращает числовое значение карты для подсчёта очков.
 */
function getCardValue(card: Card): number {
  const value = card.value;

  if (value === 'ACE') return 11;
  if (['KING', 'QUEEN', 'JACK'].includes(value)) return 10;

  return parseInt(value, 10);
}

/**
 * Подсчитывает сумму очков карт с учётом ACE как 11 или 1.
 */
export function calculateScore(cards: Card[]): number {
  let total = 0;
  let aceCount = 0;

  for (const card of cards) {
    const val = getCardValue(card);
    total += val;
    if (card.value === 'ACE') aceCount += 1;
  }

  // Если перебор — уменьшаем значение ACE с 11 до 1 по необходимости
  while (total > 21 && aceCount > 0) {
    total -= 10; // считаем ACE как 1 вместо 11
    aceCount--;
  }

  return total;
}
