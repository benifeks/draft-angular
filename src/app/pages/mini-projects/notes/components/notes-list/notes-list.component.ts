import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { deleteNote, notes } from '../../utils/notes.store';

@Component({
  selector: 'app-notes-list',
  imports: [DatePipe],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent {
  public notes = notes;

  public delete(id: string): void {
    deleteNote(id);
  }
}
