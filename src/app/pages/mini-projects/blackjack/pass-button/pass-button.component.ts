import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-pass-button',
  imports: [CommonModule],
  templateUrl: './pass-button.component.html',
  styleUrl: './pass-button.component.scss',
})
export class PassButtonComponent {
  public readonly gameStateService = inject(GameStateService);
}
