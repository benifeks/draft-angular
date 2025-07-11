import { Component } from '@angular/core';

import { CurrencyCalculatorComponent } from './currency-calculator/currency-calculator.component';
import { GuessNumberComponent } from './guess-number/guess-number.component';
import { SpiralMatrixComponent } from './spiral-matrix/spiral-matrix.component';

@Component({
  selector: 'app-tasks',
  imports: [
    GuessNumberComponent,
    SpiralMatrixComponent,
    CurrencyCalculatorComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {}
