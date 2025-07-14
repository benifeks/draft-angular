import { Component } from '@angular/core';

import { DealerHandComponent } from './components/dealer-hand/dealer-hand.component';
import { DealerScoreComponent } from './components/dealer-score/dealer-score.component';
import { DrawCardButtonComponent } from './components/draw-card-button/draw-card-button.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { PassButtonComponent } from './components/pass-button/pass-button.component';
import { PlayerHandComponent } from './components/player-hand/player-hand.component';
import { PlayerScoreComponent } from './components/player-score/player-score.component';
import { StartGameButtonComponent } from './components/start-game-button/start-game-button.component';

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
