import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

/**
 * Интерфейс карты, возвращаемой API
 */
export interface Card {
  code: string; // Код карты, например "AS" — туз пик
  image: string; // Ссылка на изображение карты
  value: string; // Значение карты (например, "ACE", "10", "KING")
  suit: string; // Масть ("SPADES", "HEARTS", "DIAMONDS", "CLUBS")
}

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private http = inject(HttpClient);
  private baseUrl = 'https://deckofcardsapi.com/api/deck';

  /**
   * Создаёт новую тасованную колоду (1 колода).
   * Возвращает Observable с deck_id.
   */
  public newDeck(): Observable<string> {
    const url = `${this.baseUrl}/new/shuffle/?deck_count=1`;
    return this.http
      .get<{ deck_id: string }>(url)
      .pipe(map((response) => response.deck_id));
  }

  /**
   * Вытягивает count карт из колоды с данным deckId.
   * Возвращает Observable с массивом карт.
   */
  public drawCards(deckId: string, count: number): Observable<Card[]> {
    const url = `${this.baseUrl}/${deckId}/draw/?count=${count}`;
    return this.http
      .get<{ cards: Card[] }>(url)
      .pipe(map((response) => response.cards));
  }
}
