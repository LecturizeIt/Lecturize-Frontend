import axios from "axios";
import { ILectureModel } from "../domain/models/lecture.model";
import { ILectureDetail } from "../domain/models/lectureDetail.model";

const API_URL = import.meta.env.VITE_BASE_API_URL; 

export const fetchLectures = async (): Promise<ILectureModel[]> => {
  const { data } = await axios.get<ILectureModel[]>(`${API_URL}/api/lectures`);
  return data;
};

export const fetchLectureDetail = async (id: string): Promise<ILectureDetail> => {
  const API_URL = import.meta.env.VITE_BASE_API_URL; 
  const { data } = await axios.get<ILectureDetail>(`${API_URL}/api/lectures/${id}`);
  return data;
};