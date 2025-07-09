import { Component } from '@angular/core';

import { ContactsComponent } from './contacts/contacts.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { LogoComponent } from './logo/logo.component';
import { RightNavComponent } from './right-nav/right-nav.component';

@Component({
  selector: 'app-header',
  imports: [
    LogoComponent,
    LeftNavComponent,
    RightNavComponent,
    ContactsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
