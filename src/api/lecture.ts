import axios from "axios";
import { ILectureModel } from "../domain/models/lecture.model";
import { ILectureDetail } from "../domain/models/lectureDetail.model";
import { getAccessToken } from "../utils/storage.utils";

const API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchLectures = async (): Promise<ILectureModel[]> => {
  const { data } = await axios.get<ILectureModel[]>(`${API_URL}/api/lectures`);
  return data;
};

export const fetchLectureById = async (id: string): Promise<ILectureDetail> => {
  const { data } = await axios.get<ILectureDetail>(
    `${API_URL}/api/lectures/${id}`
  );

  return data;
};

export const fetchLectureByUser = async (email: string): Promise<ILectureModel[]> => {
  const { data } = await axios.get<ILectureModel[]>(`${API_URL}/api/lectures`, {
    params: {
      user: email
    }
  });
  return data;
};

export const createLecture = async (
  lectureData: ILectureModel,
  tagsId: number[]
): Promise<{ id: number }> => {
  try {
    const token = getAccessToken();

    const tags = tagsId.map((id) => ({ id }));

    const response = await axios.post(
      `${API_URL}/api/lectures`,
      { ...lectureData, tags },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("lecture created: ", response.data);
    return { id: response.data.id };
  } catch (error) {
    console.log("error", error);
    return { id: -1 };
  }
};

export const deleteLecture = async (lectureId: string) => {
  const token = getAccessToken();
  return axios.delete(`${API_URL}/api/lectures/${lectureId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateLecture = async (lectureId: string, lectureData: ILectureDetail, ) => {
  const token = getAccessToken();
  return axios.put(`${API_URL}/api/lectures/${lectureId}`, lectureData, {
    headers: { Authorization: `Bearer ${token}` }, 
  });
};