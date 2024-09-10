import axios from "axios";
import { ILectureModel } from "../domain/models/lecture.model";
import { ILectureDetail } from "../domain/models/lectureDetail.model";
import { getAccessToken } from "../utils/storage";

const API_URL = import.meta.env.VITE_BASE_API_URL; 

export const fetchLectures = async (): Promise<ILectureModel[]> => {
  const { data } = await axios.get<ILectureModel[]>(`${API_URL}/api/lectures`);
  return data;
};

export const fetchLectureById = async (id: string): Promise<ILectureDetail> => {
  const API_URL = import.meta.env.VITE_BASE_API_URL; 
  const { data } = await axios.get<ILectureDetail>(`${API_URL}/api/lectures/${id}`);

  return data;
};

export const createLecture = async (lectureData: ILectureModel): Promise<void> => {
  try{
    const token = getAccessToken();

    const response = await axios.post(`${API_URL}/api/lectures`, lectureData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("lecture created: ", response.data);
  }catch (error) {
    console.log("error", error);
  }
};