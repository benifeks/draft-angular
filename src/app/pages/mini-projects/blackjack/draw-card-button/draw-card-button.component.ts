import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-draw-card-button',
  imports: [CommonModule],
  templateUrl: './draw-card-button.component.html',
  styleUrl: './draw-card-button.component.scss',
})
export class DrawCardButtonComponent {
  public readonly gameStateService = inject(GameStateService);
}
