import { Type } from "../enums/type.enums";

export interface ILectureModel {
    id?: number;
    title: string;
    lecturer: string;
    description: string;
    createdAt?: string;
    startsAt: string;
    endsAt: string;
    type: Type;
    tags: number[];
}
