import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Card } from '../../services/deck.service';
import { GameStateService } from '../../services/game-state.service';
import { CARD_BACK_URL } from '../../utils/constants';

@Component({
  selector: 'app-player-hand',
  imports: [CommonModule],
  templateUrl: './player-hand.component.html',
  styleUrl: './player-hand.component.scss',
})
export class PlayerHandComponent {
  private readonly gameStateService = inject(GameStateService);

  public readonly CARD_BACK_URL = CARD_BACK_URL;

  public readonly playerCards$: Observable<Card[]> =
    this.gameStateService.playerCards$;
}
