import { Component } from '@angular/core';

import { NoteFormComponent } from './components/note-form/note-form.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  imports: [NoteFormComponent, NotesListComponent],
})
export class NotesComponent {}
