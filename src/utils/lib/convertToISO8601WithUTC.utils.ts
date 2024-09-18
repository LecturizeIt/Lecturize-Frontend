export const convertToISO8601WithUTC = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new RangeError("Invalid date format");
  }

  return date.toISOString();
};