import { signal } from '@angular/core';

import { Note } from '../types/notes.types';

/**
 * Хранилище всех заметок — сигнал-массив Note[]
 */
export const notes = signal<Note[]>([]);

/**
 * Добавляет новую заметку в список.
 * @param title Заголовок заметки
 * @param content Текст заметки
 */
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

/**
 * Обновляет существующую заметку по id.
 * Обновляет также дату изменения.
 * @param id Идентификатор заметки
 * @param title Новый заголовок
 * @param content Новый текст
 */
export function updateNote(id: string, title: string, content: string): void {
  const now: Date = new Date();

  notes.update((current: Note[]) =>
    current.map((note: Note) =>
      note.id === id ? { ...note, title, content, updatedAt: now } : note
    )
  );
}

/**
 * Удаляет заметку по id.
 * @param id Идентификатор заметки
 */
export function deleteNote(id: string): void {
  notes.update((current: Note[]) =>
    current.filter((note: Note) => note.id !== id)
  );
}

/**
 * Полностью очищает все заметки.
 */
export function clearNotes(): void {
  notes.set([]);
}
