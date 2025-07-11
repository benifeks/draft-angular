import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

import {
  generateSecretNumber,
  handleGuess,
  resetGame,
} from './guess-number.utils';

@Component({
  selector: 'app-guess-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guess-number.component.html',
  styleUrls: ['./guess-number.component.scss'],
})
export class GuessNumberComponent {
  guess = signal('');
  secretNumber = signal(generateSecretNumber());
  attemptsLeft = signal(5);
  result = signal('');
  gameOver = signal(false);

  readonly attemptsOver = computed(
    () => this.attemptsLeft() <= 0 || this.gameOver()
  );

  submit() {
    handleGuess(
      this.guess(),
      this.secretNumber(),
      this.attemptsLeft(),
      this.attemptsLeft.set.bind(this.attemptsLeft),
      this.result.set.bind(this.result),
      this.gameOver.set.bind(this.gameOver)
    );
    this.guess.set('');
  }

  reset() {
    resetGame(
      this.guess.set.bind(this.guess),
      this.result.set.bind(this.result),
      this.secretNumber.set.bind(this.secretNumber),
      this.attemptsLeft.set.bind(this.attemptsLeft),
      this.gameOver.set.bind(this.gameOver)
    );
  }

  onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.guess.set(value);
  }
}
