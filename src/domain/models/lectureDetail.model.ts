import { Status } from "../enums/status.enum";
import { Type } from "../enums/type.enums";
import { ICategoryTag } from "./categoryTag.model";
import { IUser } from "./user.model";

export interface ILectureDetail {
  id: number;
  title: string; 
  description: string;
  type: Type;
  startsAt: string;
  endsAt: string;
  lecturer: string;
  status: Status;
  url: string | null;
  address: string | null;
  tags: ICategoryTag[];
  organizer: IUser;
}
  