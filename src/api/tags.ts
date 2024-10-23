import { ITag } from "../domain/models/tag.model";
import { api } from "./api";


export const fetchTags = async (): Promise<ITag[]> => {
  try {
    const { data } = await api.get<ITag[]>("/api/tags");

    return data;
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    return []; 
  }
};
