import { Card } from '../services/deck.service';
import { GameStateService } from '../services/game-state.service';

import { finalizeGameState } from './finalize.utils';
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

  return {
    playerCards,
    dealerCards,
    playerScore,
    dealerScore,
    hideDealerScore: true, // в начале скрываем одну карту дилера
  };
}

function evaluateInitialResult(
  playerScore: number,
  dealerScore: number,
  gameStateService: GameStateService
): void {
  // инициализация игры

  if (playerScore === 21 && dealerScore === 21) {
    gameStateService.setGameResult('🤝 Ничья');
    finalizeGameState(gameStateService);
    return;
  }
  if (playerScore === 21) {
    gameStateService.setGameResult('🎉 Победа игрока - 21(blackjack)');
    finalizeGameState(gameStateService);
    return;
  }
  if (dealerScore === 21) {
    gameStateService.setGameResult('💼 Победа дилера - 21(blackjack)');
    finalizeGameState(gameStateService);
    return;
  }
  // Игра продолжается
  gameStateService.setGameResult('🎲 Игра продолжается');
  gameStateService.setHideDealerScore(true);
  gameStateService.setCanStartGame(false);
  gameStateService.setCanDrawCard(true);
  gameStateService.setCanPass(true);
}
