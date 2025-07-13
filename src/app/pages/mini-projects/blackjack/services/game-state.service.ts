import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Card } from './deck.service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  // ───────────────────────────────────────────────
  // 🎴 Deck ID — идентификатор текущей колоды
  // ───────────────────────────────────────────────

  private readonly _deckId = new BehaviorSubject<string | null>(null);
  public readonly deckId$ = this._deckId.asObservable();

  public setDeckId(deckId: string): void {
    this._deckId.next(deckId);
  }

  public clearDeckId(): void {
    this._deckId.next(null);
  }

  // ───────────────────────────────────────────────
  // 👤 Игрок: карты и очки
  // ───────────────────────────────────────────────

  private readonly _playerCards = new BehaviorSubject<Card[]>([]);
  public readonly playerCards$ = this._playerCards.asObservable();

  private readonly _playerScore = new BehaviorSubject<number>(0);
  public readonly playerScore$ = this._playerScore.asObservable();

  public setPlayerCards(cards: Card[]): void {
    this._playerCards.next(cards);
  }

  public setPlayerScore(score: number): void {
    this._playerScore.next(score);
  }

  // ───────────────────────────────────────────────
  // 🧑‍⚖️ Дилер: карты и очки
  // ───────────────────────────────────────────────

  private readonly _dealerCards = new BehaviorSubject<Card[]>([]);
  public readonly dealerCards$ = this._dealerCards.asObservable();

  private readonly _dealerScore = new BehaviorSubject<number>(0);
  public readonly dealerScore$ = this._dealerScore.asObservable();

  public setDealerCards(cards: Card[]): void {
    this._dealerCards.next(cards);
  }

  public setDealerScore(score: number): void {
    this._dealerScore.next(score);
  }

  // ───────────────────────────────────────────────
  // ✨ Скрывать ли первую карту дилера
  // ───────────────────────────────────────────────
  private readonly _hideDealerCard = new BehaviorSubject<boolean>(true);
  public readonly hideDealerCard$ = this._hideDealerCard.asObservable();
  public setHideDealerCard(value: boolean): void {
    this._hideDealerCard.next(value);
  }

  // ───────────────────────────────────────────────
  // 🃏 Флаг скрытия очков дилера (true — скрыть очки, false — показывать)
  // ───────────────────────────────────────────────
  private readonly _hideDealerScore = new BehaviorSubject<boolean>(true);
  public readonly hideDealerScore$ = this._hideDealerScore.asObservable();
  public setHideDealerScore(value: boolean): void {
    this._hideDealerScore.next(value);
  }

  // ───────────────────────────────────────────────
  // 🎯 Результат игры
  // ───────────────────────────────────────────────

  private readonly _gameResult = new BehaviorSubject<string | null>(
    'Нажмите "Начать игру"'
  );
  public readonly gameResult$ = this._gameResult.asObservable();

  public setGameResult(message: string): void {
    this._gameResult.next(message);
  }

  // 🔘 Кнопка "Начать игру"
  private readonly _canStartGame = new BehaviorSubject<boolean>(true);
  public readonly canStartGame$ = this._canStartGame.asObservable();
  public setCanStartGame(value: boolean): void {
    this._canStartGame.next(value);
  }

  // 🃏 Кнопка "Взять карту"
  private readonly _canDrawCard = new BehaviorSubject<boolean>(false);
  public readonly canDrawCard$ = this._canDrawCard.asObservable();
  public setCanDrawCard(value: boolean): void {
    this._canDrawCard.next(value);
  }

  // ✋ Кнопка "Пас"
  private readonly _canPass = new BehaviorSubject<boolean>(false);
  public readonly canPass$ = this._canPass.asObservable();
  public setCanPass(value: boolean): void {
    this._canPass.next(value);
  }
}
