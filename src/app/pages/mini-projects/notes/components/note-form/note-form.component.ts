import { Component, signal } from '@angular/core';

import { addNote } from '../../utils/notes.store';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
  imports: [],
})
export class NoteFormComponent {
  public title = signal('');
  public content = signal('');
  public errorMessage = signal('');

  public submit(event: Event): void {
    event.preventDefault();
    const title = this.title().trim();
    const content = this.content().trim();

    if (!title || !content) {
      this.errorMessage.set('Заполните все поля');
      return;
    }

    addNote(title, content);

    this.title.set('');
    this.content.set('');
    this.errorMessage.set('');
  }

  public clearError(): void {
    this.errorMessage.set('');
  }
}
