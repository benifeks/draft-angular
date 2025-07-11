import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-dealer-score',
  imports: [AsyncPipe],
  templateUrl: './dealer-score.component.html',
  styleUrl: './dealer-score.component.scss',
})
export class DealerScoreComponent {
  private readonly gameStateService: GameStateService =
    inject(GameStateService);

  public readonly displayedDealerScore$ = combineLatest([
    this.gameStateService.dealerCards$,
    this.gameStateService.dealerScore$,
  ]).pipe(
    map(([cards, score]) => (cards.length === 2 ? '🤔' : score.toString()))
  );
}
