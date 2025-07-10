import { Component } from '@angular/core';

import { ABOUT_CARDS } from './about-cards';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  public aboutCards = ABOUT_CARDS;
  public spritePath = 'assets/images/about/symbol-defs.svg';
}
