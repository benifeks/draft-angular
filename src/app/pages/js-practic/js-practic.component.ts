import { Component } from '@angular/core';

import { CarouselComponent } from './carousel/carousel.component';
import { PresentTasksComponent } from './present-tasks/present-tasks.component';

@Component({
  selector: 'app-js-practic',
  imports: [CarouselComponent, PresentTasksComponent],
  templateUrl: './js-practic.component.html',
  styleUrl: './js-practic.component.scss',
})
export class JsPracticComponent {}
