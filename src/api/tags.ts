import axios from "axios";
import { ITag } from "../domain/models/tag.model";

const API_URL = import.meta.env.VITE_BASE_API_URL; 

export const fetchTags = async (): Promise<ITag[]> => {
  try {
    const { data } = await axios.get<ITag[]>(`${API_URL}/api/tags`);

    return data;
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    return []; 
  }
};
