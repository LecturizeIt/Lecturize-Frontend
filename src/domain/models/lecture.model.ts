import { Type } from "../enums/type.enums";

export interface ILectureModel {
    id?: number;
    title: string;
    description: string;
    startsAt: string;
    endsAt: string;
    type: Type;
    tags: number[];
}
