import { ILectureModel, ILectureDetail } from "../domain/models/lecture.model";
import { getAccessToken } from "../utils/storage.utils";
import { IUser } from "../domain/models/user.model";
import { ITag } from "../domain/models/tag.model";
import { api } from "./api";

export const fetchLectures = async (): Promise<ILectureModel[]> => {
  const { data } = await api.get<ILectureModel[]>("/api/lectures");
  return data;
};

export const fetchLectureById = async (id: string): Promise<ILectureDetail> => {
  const { data } = await api.get<ILectureDetail>(`/api/lectures/${id}`);
  const imageUrl = getImageUrl(Number(id));
  return { ...data, imageUrl };
};

const getImageUrl = (id: number) => {
  return `https://lecturizeit.westus2.cloudapp.azure.com/api/lectures/${id}/image`;
};

export const fetchLectureByIdWithImage = async () => {
  const lectures = await fetchLectures();
  const lecturesWithImages = await Promise.all(
    lectures.map(async (lecture) => {
      if (lecture.id !== undefined) {
        const imageUrl = getImageUrl(lecture.id);
        return { ...lecture, imageUrl };
      }
      return lecture; 
    })
  );
  return lecturesWithImages;
};

export const fetchLectureParticipants = async (id: number): Promise<IUser[]> => {
  const { data } = await api.get<IUser[]>(`/api/lectures/${id}/participants`);
  
  return data;
};

export const fetchLectureByUser = async (email: string): Promise<ILectureModel[]> => {
  const { data } = await api.get<ILectureModel[]>("/api/lectures", {
    params: {
      user: email
    }
  });
  const lecturesWithImages = await Promise.all(
    data.map(async (data) => {
      if(data.id !== undefined) {
        const imageUrl = getImageUrl(data.id);
        return { ...data, imageUrl };
      }
      return data;
    })
  );
  return lecturesWithImages;
};

export const participateInLecture = async (id: string): Promise<void> => {
  const token = getAccessToken();

  await api.put(`/api/lectures/${id}/participate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const unParticipateInLecture = async (id: string): Promise<void> => {
  const token = getAccessToken();

  await api.put(`/api/lectures/${id}/unparticipate`, 
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

    const tags = tagsId.map(tag => ({ id: tag.id }));

    console.log("Data being sent:", { ...lectureData, tags });

    const response = await api.post(
      "/api/lectures",
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
  return api.delete(`/api/lectures/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateLecture = async (id: string, lectureData: Partial<ILectureDetail>) => {
  const token = getAccessToken();
  return api.put(`/api/lectures/${id}`, lectureData, {
    headers: { Authorization: `Bearer ${token}` }, 
  });
};

export const uploadImage = async (id: string, imageFile: File, description: string) => {
  const token = getAccessToken();

  const formData = new FormData(); 
  formData.append("file", imageFile); 
  formData.append("description", description);

  try{
    const response = await api.put(`/api/lectures/${id}/image`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  }catch (error) {
    console.log("error", error);
  }
};