import axios from "axios";
import { ILectureModel } from "../domain/models/lecture.model";
import { ILectureDetail } from "../domain/models/lectureDetail.model";
import { getAccessToken } from "../utils/storage.utils";
import { IUser } from "../domain/models/user.model";
import { ITag } from "../domain/models/tag.model";

const API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchLectures = async (): Promise<ILectureModel[]> => {
  const { data } = await axios.get<ILectureModel[]>(`${API_URL}api/lectures`);
  return data;
};

export const fetchLectureById = async (id: string): Promise<ILectureDetail> => {
  const { data } = await axios.get<ILectureDetail>(
    `${API_URL}api/lectures/${id}`
  );

  return data;
};

export const fetchLectureParticipants = async (id: number): Promise<IUser[]> => {
  const { data } = await axios.get<IUser[]>(
    `${API_URL}api/lectures/${id}/participants`
  );
  
  return data;
};

export const fetchLectureByUser = async (email: string): Promise<ILectureModel[]> => {
  const { data } = await axios.get<ILectureModel[]>(`${API_URL}api/lectures`, {
    params: {
      user: email
    }
  });
  return data;
};

export const participateInLecture = async (id: string): Promise<void> => {
  const token = getAccessToken();

  await axios.put(
    `${API_URL}api/lectures/${id}/participate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const createLecture = async (
  lectureData: ILectureModel,
  tagsId: ITag[]
): Promise<{ id: number }> => {
  try {
    const token = getAccessToken();

    const tags = tagsId.map((id) => ({ id }));

    const response = await axios.post(
      `${API_URL}api/lectures`,
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

export const deleteLecture = async (id: string) => {
  const token = getAccessToken();
  return axios.delete(`${API_URL}api/lectures/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateLecture = async (id: string, lectureData: Partial<ILectureDetail>) => {
  const token = getAccessToken();
  return axios.put(`${API_URL}api/lectures/${id}`, lectureData, {
    headers: { Authorization: `Bearer ${token}` }, 
  });
};