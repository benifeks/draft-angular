import { Component } from '@angular/core';

import { DealerHandComponent } from './dealer-hand/dealer-hand.component';
import { DealerScoreComponent } from './dealer-score/dealer-score.component';
import { DrawCardButtonComponent } from './draw-card-button/draw-card-button.component';
import { GameResultComponent } from './game-result/game-result.component';
import { PassButtonComponent } from './pass-button/pass-button.component';
import { PlayerHandComponent } from './player-hand/player-hand.component';
import { PlayerScoreComponent } from './player-score/player-score.component';
import { StartGameButtonComponent } from './start-game-button/start-game-button.component';

@Component({
  selector: 'app-blackjack',
  imports: [
    StartGameButtonComponent,
    DealerHandComponent,
    PlayerHandComponent,
    PlayerScoreComponent,
    DealerScoreComponent,
    GameResultComponent,
    DrawCardButtonComponent,
    PassButtonComponent,
  ],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.scss',
})
export class BlackjackComponent {}
