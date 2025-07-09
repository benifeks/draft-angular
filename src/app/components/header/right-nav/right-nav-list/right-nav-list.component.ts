import { Component } from '@angular/core';

import { toggleBoolean } from '@app/shared/utils/toggle-state';

@Component({
  selector: 'app-right-nav-list',
  imports: [],
  templateUrl: './right-nav-list.component.html',
  styleUrl: './right-nav-list.component.scss',
})
export class RightNavListComponent {
  public isMenuOpen: boolean = false;

  public toggleMenu = toggleBoolean;
}
