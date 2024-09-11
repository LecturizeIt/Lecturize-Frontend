import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_API_URL; 

export const fetchTags = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const { data } = await axios.get<{ id: number; name: string }[]>(`${API_URL}/api/tags`);

    return data;
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    return []; 
  }
};
