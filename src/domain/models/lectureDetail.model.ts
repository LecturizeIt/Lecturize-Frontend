import { Status } from "../enums/status.enum";
import { Type } from "../enums/type.enums";
import { ITag } from "./tag.model";
import { IUser } from "./user.model";

export interface ILectureDetail {
  id: number;
  title: string; 
  description: string;
  type: Type;
  createdAt: string;
  startsAt: string;
  endsAt: string;
  lecturer: string;
  status: Status;
  url: string | null;
  address: string | null;
  tags: ITag[];
  organizer: IUser;
  maximumCapacity: number;
}
  