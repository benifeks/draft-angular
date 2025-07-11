import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { convertToUSD, getExchangeRate } from './currency-calculator.utils';

@Component({
  selector: 'app-currency-calculator',
  imports: [CommonModule],
  templateUrl: './currency-calculator.component.html',
  styleUrl: './currency-calculator.component.scss',
})
export class CurrencyCalculatorComponent {
  uah = signal('');
  usd = signal<number | null>(null);
  rate = signal<number | null>(null);
  loading = signal(false);

  onChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.uah.set(value);
    this.usd.set(null);
    this.rate.set(null);
  }

  async convert() {
    const uahValue = this.uah();
    if (!uahValue) return;

    this.loading.set(true);

    const exchangeRate = await getExchangeRate();

    if (exchangeRate) {
      this.rate.set(exchangeRate);
      const result = convertToUSD(uahValue, exchangeRate);
      this.usd.set(result);
    }

    this.loading.set(false);
  }

  clear() {
    this.uah.set('');
    this.usd.set(null);
    this.rate.set(null);
  }
}
