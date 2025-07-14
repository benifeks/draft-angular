import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-player-score',
  imports: [AsyncPipe],
  templateUrl: './player-score.component.html',
  styleUrl: './player-score.component.scss',
})
export class PlayerScoreComponent {
  private readonly gameStateService = inject(GameStateService);
  public readonly playerScore$ = this.gameStateService.playerScore$;
}
