import { EnvironmentInjector, inject, signal } from '@angular/core';

import { Note } from '../types/notes.types';

import { syncSignalWithLocalStorage } from './local-storage.util';

export const notes = signal<Note[]>([]);
export const selectedNoteId = signal<string | null>(null);
export const editingNoteId = signal<string | null>(null); //для редактирования

export function setupNotesStore(): void {
  const injector = inject(EnvironmentInjector);
  syncSignalWithLocalStorage('notes-app/notes', notes, injector);
}

export function addNote(title: string, content: string): void {
  const now: Date = new Date();

  notes.update((current: Note[]) => [
    ...current,
    {
      id: crypto.randomUUID(), // уникальный идентификатор
      title,
      content,
      createdAt: now, // фиксируется при создании
      updatedAt: null, // изначально null
    },
  ]);
}

export function updateNote(id: string, title: string, content: string): void {
  const now: Date = new Date();

  notes.update((current: Note[]) =>
    current.map((note: Note) =>
      note.id === id ? { ...note, title, content, updatedAt: now } : note
    )
  );
}

export function deleteNote(id: string): void {
  notes.update((current: Note[]) =>
    current.filter((note: Note) => note.id !== id)
  );
}

export function clearNotes(): void {
  notes.set([]);
}
