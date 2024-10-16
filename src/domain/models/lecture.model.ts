
import { Type } from "../enums/type.enums";
import { ITag } from "./tag.model";
import { IUser } from "./user.model";

export interface ILectureModel {
  id?: number;
  createdAt?: string;
  title: string;
  lecturer: string;
  description: string;
  startsAt: string;
  endsAt: string;
  type: Type;
  tags: ITag[];
  url?: string | null;
  address?: string | null;
  maximumCapacity?: number;
}

export interface ILectureDetail extends ILectureModel {
  id: number;
  createdAt: string;
  status: string;
  organizer: IUser;
}
