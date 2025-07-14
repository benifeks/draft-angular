import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-game-result',
  imports: [CommonModule],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss',
})
export class GameResultComponent {
  public readonly gameStateService = inject(GameStateService);

  public readonly gameResult$ = this.gameStateService.gameResult$;
}
