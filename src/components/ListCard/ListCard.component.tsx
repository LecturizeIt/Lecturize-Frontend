
import React from "react";
import CardLecture from "../CardLecture/CardLecture.component";
import { ILectureModel } from "../../domain/models/lecture.model";

interface IListCardsProps {
  lectures: ILectureModel[];
  onCardClick: (id: number) => void;
}

const ListCards: React.FC<IListCardsProps> = ({ lectures, onCardClick }) => {
  return (
    <div className="h-auto mt-10 flex flex-wrap gap-4 gap-y-10 justify-center ">
      {lectures.map(lecture => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6" key={lecture.id}>
          <CardLecture 
            key={lecture.id} 
            onClick={() => onCardClick(lecture.id)} 
            lecture={lecture} 
          />
        </div>
      ))}
    </div>
  );
};

export default ListCards;
