import { Component } from '@angular/core';

import { NoteEditComponent } from './components/note-edit/note-edit.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteItemComponent } from './components/note-item/note-item.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { setupNotesStore } from './utils/notes.store';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  imports: [
    NoteFormComponent,
    NotesListComponent,
    NoteItemComponent,
    NoteEditComponent,
  ],
})
export class NotesComponent {
  private constructor() {
    setupNotesStore();
  }
}
