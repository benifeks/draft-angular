import { Component } from '@angular/core';
import { toggleBoolean } from '@app/shared/utils/toggle-state';

@Component({
  selector: 'app-left-nav-list',
  imports: [],
  templateUrl: './left-nav-list.component.html',
  styleUrl: './left-nav-list.component.scss',
})
export class LeftNavListComponent {
  public isMenuOpen: boolean = false;

  public toggleMenu = toggleBoolean;
}
