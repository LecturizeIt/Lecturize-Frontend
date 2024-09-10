export function convertToISO8601WithUTC (dateTimeLocal: string): string {
  const date = new Date(dateTimeLocal);
  return date.toISOString();
}