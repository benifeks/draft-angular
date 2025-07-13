import { Card } from '../deck.service';
import { GameStateService } from '../game-state.service';

import { calculateScore } from './score.utils';

/**
 * Инициализация стартовой руки:
 * - 2 карты игроку
 * - 2 карты дилеру
 * - подсчёт очков
 * - установка начального состояния
 */
export function initializeHands(
  cards: Card[],
  gameStateService: GameStateService
): {
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

  // скрываем одну карту дилера
  gameStateService.setHideDealerCard(true);

  // 🎯 Сравнение очков и обновление состояния
  evaluateInitialResult(playerScore, dealerScore, gameStateService);

  // 🚀 Вывод в консоль
  console.log('🧮 Очки игрока:', playerScore);
  console.log('🧮 Очки дилера (оба):', dealerScore);

  return {
    playerCards,
    dealerCards,
    playerScore,
    dealerScore,
    hideDealerScore: true, // в начале скрываем одну карту дилера
  };
}

/**
 * Проверка начальных очков и установка результата
 */
function evaluateInitialResult(
  playerScore: number,
  dealerScore: number,
  gameStateService: GameStateService
): void {
  gameStateService.setCanDrawCard(false);
  gameStateService.setCanPass(false);
  gameStateService.setCanStartGame(true);
  gameStateService.setHideDealerCard(false);
  gameStateService.setHideDealerScore(false);

  if (playerScore === 21 && dealerScore === 21) {
    gameStateService.setGameResult('🤝 Ничья');

    return;
  }
  if (playerScore === 21) {
    gameStateService.setGameResult('🎉 Победа игрока - 21(blackjack)');

    return;
  }
  if (dealerScore === 21) {
    gameStateService.setGameResult('💼 Победа дилера - 21(blackjack)');

    return;
  }
  // Игра продолжается
  gameStateService.setHideDealerCard(true);
  gameStateService.setHideDealerScore(true);
  gameStateService.setGameResult('🎲 Игра продолжается');
  gameStateService.setCanStartGame(false);
  gameStateService.setCanDrawCard(true);
  gameStateService.setCanPass(true);
}
