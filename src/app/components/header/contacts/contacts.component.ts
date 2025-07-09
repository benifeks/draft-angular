import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contacts',
  imports: [FontAwesomeModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  public icons = {
    telegram: faTelegram,
    facebook: faFacebook,
  };
}
