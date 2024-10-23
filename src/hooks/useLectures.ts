import { fetchLectureByIdWithImage, fetchLectureByUser } from "../api/lecture";
import { useAuth } from "../context/AuthContext";
import { ILectureModel } from "../domain/models/lecture.model";
import { useQuery } from "@tanstack/react-query";

export const useLectures = () => {
  return useQuery<ILectureModel[]>({
    queryKey: ["lectures"],
    queryFn: fetchLectureByIdWithImage,
  });
};

export const useLecturesByUser = () => {

  const { user } = useAuth();

  return useQuery<ILectureModel[]>({
    queryKey: ["lectures", user?.email],
    queryFn: () => fetchLectureByUser(user?.email || ""),
    enabled: !!user?.email,
  });
};
