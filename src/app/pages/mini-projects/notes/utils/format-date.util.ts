/**
 * Форматирует дату в строку вида "дд.мм.гггг (чч:мм)"
 */
export function formatDate(date: Date): string {
  const pad = (n: number): string => n.toString().padStart(2, '0');

  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yyyy = date.getFullYear();
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${dd}.${mm}.${yyyy} (${hh}:${min})`;
}
