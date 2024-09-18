import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dateFormatted = (date: string | Date | number | undefined): string => {
  if (!date) return "Data não disponível";

  const parsedDate = typeof date === "string" || typeof date === "number" ? new Date(date) : date;

  return format(parsedDate, "d 'de' LLLL 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  });
};

export const dateRelativeNow = (date: string | Date | number | undefined): string =>{
  if (!date) return "Data não disponível";

  const parsedDate = typeof date === "string" || typeof date === "number" ? new Date(date) : date;

  return formatDistanceToNow(parsedDate, {
    locale: ptBR,
    addSuffix: true,
  });
};

export const formatDateTimeForInput = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toISOString().slice(0, 16); 
};