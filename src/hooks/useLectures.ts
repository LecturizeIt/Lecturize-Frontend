import { fetchLectures } from "../api/lecture";
import { ILectureModel } from "../domain/models/lecture.model";
import { useQuery } from "@tanstack/react-query";

export const useLectures = () => {
  return useQuery<ILectureModel[]>({
    queryKey: ["lectures"],
    queryFn: fetchLectures,
  });
};
