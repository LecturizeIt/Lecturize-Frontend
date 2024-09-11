
import React from "react";
import CardLecture from "../CardLecture/CardLecture.component";
import { ILectureModel } from "../../domain/models/lecture.model";

interface IListCardsProps {
  lectures: ILectureModel[];
  onCardClick: (id: number) => void;
}

const ListCards: React.FC<IListCardsProps> = ({ lectures, onCardClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      {lectures.map(lecture => (
        <div className="flex flex-wrap justify-center gap-4 mt-10" key={lecture.id}>
          <CardLecture 
            key={lecture.id} 
            onClick={() => onCardClick(lecture.id!)} 
            lecture={lecture} 
          />
        </div>
      ))}
    </div>
  );
};

export default ListCards;
