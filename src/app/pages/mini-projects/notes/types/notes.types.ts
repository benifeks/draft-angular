/**
 * Модель заметки, используемая в приложении "Заметки".
 */
export interface Note {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
}
