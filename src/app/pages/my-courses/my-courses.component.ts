import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { COURSES } from './courses';

@Component({
  selector: 'app-my-courses',
  imports: [CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
})
export class MyCoursesComponent {
  public courses = COURSES;
  public spritePath = 'assets/images/svg/technologies/symbol-defs.svg';
}
