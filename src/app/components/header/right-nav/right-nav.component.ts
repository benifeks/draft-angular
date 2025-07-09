import { Component } from '@angular/core';
import { RightNavListComponent } from './right-nav-list/right-nav-list.component';

@Component({
  selector: 'app-right-nav',
  imports: [RightNavListComponent],
  templateUrl: './right-nav.component.html',
  styleUrl: './right-nav.component.scss',
})
export class RightNavComponent {}
