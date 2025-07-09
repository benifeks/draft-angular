import { Component } from '@angular/core';
import { LeftNavListComponent } from './left-nav-list/left-nav-list.component';

@Component({
  selector: 'app-left-nav',
  imports: [LeftNavListComponent],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss',
})
export class LeftNavComponent {}
