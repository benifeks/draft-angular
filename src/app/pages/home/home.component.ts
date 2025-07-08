import { Component } from '@angular/core';

import { AboutComponent } from '@app/pages/about/about.component';
import { ContactMailComponent } from '@app/pages/contact-mail/contact-mail.component';
import { HeroComponent } from '@app/pages/hero/hero.component';
import { JsPracticComponent } from '@app/pages/js-practic/js-practic.component';
import { MyCoursesComponent } from '@app/pages/my-courses/my-courses.component';
import { TechnologiesComponent } from '@app/pages/technologies/technologies.component';

@Component({
  selector: 'app-home',
  imports: [
    AboutComponent,
    JsPracticComponent,
    ContactMailComponent,
    HeroComponent,
    TechnologiesComponent,
    MyCoursesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
