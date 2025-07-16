import { Component, computed, effect, signal } from '@angular/core';

import { Note } from '../../types/notes.types';
import { editingNoteId, notes, updateNote } from '../../utils/notes.store';

@Component({
  selector: 'app-note-edit',
  imports: [],
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.scss',
})
export class NoteEditComponent {
  public readonly editingId = editingNoteId;

  public readonly note = computed<Note | undefined>(() =>
    notes().find((n) => n.id === this.editingId())
  );

  public readonly title = signal('');
  public readonly content = signal('');

  // Автоматически синхронизируем поля с текущей заметкой
  public constructor() {
    effect(() => {
      const n = this.note();
      if (n) {
        this.title.set(n.title);
        this.content.set(n.content);
      }
    });
  }

  public updateTitle(event: Event): void {
    this.title.set((event.target as HTMLInputElement).value);
  }

  public updateContent(event: Event): void {
    this.content.set((event.target as HTMLTextAreaElement).value);
  }

  public save(): void {
    const id = this.editingId();
    const title = this.title().trim();
    const content = this.content().trim();

    if (!id || !title || !content) return;

    updateNote(id, title, content);
    editingNoteId.set(null);
  }

  public cancel(): void {
    editingNoteId.set(null);
  }
}
