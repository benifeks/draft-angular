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
  private readonly gameStateService = inject(GameStateService);

  // Объединяем  очки дилера и флаг скрытия очков
  public readonly displayedDealerScore$ = combineLatest([
    this.gameStateService.dealerScore$,
    this.gameStateService.hideDealerScore$, // флаг скрытия очков
  ]).pipe(
    map(([score, hideScore]) => {
      // Если нужно скрыть очки (обычно на старте) — показываем эмодзи
      if (hideScore) return '🤔';
      // Иначе показываем очки дилера (число)
      return score.toString();
    })
  );
}
