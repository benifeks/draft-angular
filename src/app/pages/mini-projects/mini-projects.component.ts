import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-mini-projects',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './mini-projects.component.html',
  styleUrl: './mini-projects.component.scss',
})
export class MiniProjectsComponent {}
