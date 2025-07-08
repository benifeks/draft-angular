// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { ContactMailComponent } from './pages/contact-mail/contact-mail.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { JsPracticComponent } from './pages/js-practic/js-practic.component';
import { MiniProjectsComponent } from './pages/mini-projects/mini-projects.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';

export const routesApp: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'technologies', component: TechnologiesComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'js-practic', component: JsPracticComponent },
  { path: 'contact-mail', component: ContactMailComponent },
  { path: 'tasks', component: TasksComponent },
  {
    path: 'mini-projects',
    component: MiniProjectsComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/mini-projects/projects-home/projects-home.component'
          ).then((m) => m.ProjectsHomeComponent),
      },
      {
        path: 'blackjack',
        loadComponent: () =>
          import('./pages/mini-projects/blackjack/blackjack.component').then(
            (m) => m.BlackjackComponent
          ),
      },
      {
        path: 'table',
        loadComponent: () =>
          import('./pages/mini-projects/table/table.component').then(
            (m) => m.TableComponent
          ),
      },
      {
        path: 'notes',
        loadComponent: () =>
          import('./pages/mini-projects/notes/notes.component').then(
            (m) => m.NotesComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
