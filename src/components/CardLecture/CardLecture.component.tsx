import { ILectureModel } from "../../domain/models/lecture.model";
import Button from "../../ui/Button/Button.ui";

type CardLectureProps = {
  lecture: ILectureModel;
  onClick?: () => void;
}

const CardLecture = ({ lecture, onClick }: CardLectureProps) => {
  return (
    <div className="flex flex-col w-80 h-96 rounded-xl bg-white text-gray-700 shadow-md">
      <div className="relative flex-shrink-0 h-32 rounded-t-xl bg-blue-gray-500 bg-gradient-to-r from-[#861efd] to-[#2a27d6] overflow-hidden">
        <img className="object-cover w-full h-full" src="/images/heroBanner.png" alt="img default" />
      </div>
      <div className="flex-1 p-6">
        <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
          {lecture.title}
        </h5>
        <p className="text-base font-light text-gray-700">
          {lecture.description}
        </p>
        <p className="text-base font-light text-gray-700">
          Palestra do tipo - {lecture.type}
        </p>
      </div>
      <div className="p-6 pt-0 mt-auto">
        <Button text="Ver mais" onClick={onClick} data-ripple-light="true" />
      </div>
    </div>
  );
};

export default CardLecture;
