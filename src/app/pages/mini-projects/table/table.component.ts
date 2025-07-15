import { Component } from '@angular/core';

import { LoadUsersButtonComponent } from './components/load-users-button/load-users-button.component';
import { UserDetailsCardComponent } from './components/user-details-card/user-details-card.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

@Component({
  selector: 'app-table',
  imports: [
    LoadUsersButtonComponent,
    UsersTableComponent,
    UserDetailsCardComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {}
