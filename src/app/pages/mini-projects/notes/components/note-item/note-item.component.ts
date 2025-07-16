import { DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';

import { Note } from '../../types/notes.types';
import { editingNoteId, notes, selectedNoteId } from '../../utils/notes.store';

@Component({
  selector: 'app-note-item',
  standalone: true,
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.scss',
  imports: [DatePipe],
})
export class NoteItemComponent {
  public readonly selectedId = selectedNoteId;

  public readonly note = computed<Note | undefined>(() =>
    notes().find((n) => n.id === this.selectedId())
  );

  public edit(): void {
    editingNoteId.set(this.note()?.id ?? null);
  }

  public close(): void {
    selectedNoteId.set(null);
  }
}
