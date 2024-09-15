import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dateFormatted = (date: string | Date | number | undefined): string => {
  if (!date) return "Data não disponível";

  const parsedDate = typeof date === "string" || typeof date === "number" ? new Date(date) : date;

  return format(parsedDate, "d 'de' LLLL 'às' HH:mm", {
    locale: ptBR,
  });
};
