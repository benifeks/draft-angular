import { Component } from '@angular/core';

import { ICONS } from './icons';

@Component({
  selector: 'app-technologies',
  imports: [],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
})
export class TechnologiesComponent {
  public icons = ICONS;
  public spritePath = 'assets/images/svg/technologies/symbol-defs.svg#icon-';
}
