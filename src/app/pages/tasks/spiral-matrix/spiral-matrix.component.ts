import { Component, signal } from '@angular/core';

import { animateSpiralFill, generateMatrix } from './spiral-matrix.utils';

@Component({
  selector: 'app-spiral-matrix',
  standalone: true,
  templateUrl: './spiral-matrix.component.html',
  styleUrls: ['./spiral-matrix.component.scss'],
})
export class SpiralMatrixComponent {
  public size = signal('');
  public matrix = signal<(number | string)[][]>([]);

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }
    this.size.set(input.value);
  }

  start() {
    const sizeNum = Number(this.size());
    if (!sizeNum) return;
    animateSpiralFill(sizeNum, this.matrix.set);
    const m = generateMatrix(sizeNum);
    this.matrix.set(m);
    this.size.set('');
  }

  clear() {
    this.size.set('');
    this.matrix.set([]);
  }
}
