import axios from "axios";
import { ILectureModel } from "../domain/models/lecture.model";

const API_URL = import.meta.env.VITE_BASE_API_URL; 

export const fetchLectures = async (): Promise<ILectureModel[]> => {
  const { data } = await axios.get<ILectureModel[]>(`${API_URL}/api/lectures`);
  return data;
};
