import { ShareIcon } from "@heroicons/react/16/solid";
import { ILectureModel } from "../../domain/models/lecture.model";
import Button from "../../ui/Button/Button.ui";
import ShareTooltip from "../ShareTooltip/ShareTooltip.component";
import Tooltip from "../../ui/Tooltip/Tooltip.ui";
import { useRef, useState } from "react";
import { truncateText } from "../../utils/lib/text.utils";
import { dateRelativeNow } from "../../utils/lib/date.utils";

import styles from "./CardLecture.module.css";


type CardLectureProps = {
  lecture: ILectureModel;
  onClick?: () => void;
};

const CardLecture = ({ lecture, onClick }: CardLectureProps) => {
  const shareUrl = `${window.location.href}lectures/${lecture.id}`;

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTooltip = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: buttonRect.bottom + window.scrollY + 10,
        left: buttonRect.left + window.scrollX
      });
      setIsTooltipVisible(prev => !prev);
    }
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className={`${styles.card} ${styles["card-border"]} flex flex-col w-80 h-[450px] rounded-xl bg-white text-gray-700 shadow-xl` }>
      <div className="relative flex-shrink-0 h-44 rounded-t-lg overflow-hidden">
        <img className="object-cover w-full h-full" src={lecture.imageUrl} alt="Imagem de capa da palestra"/>
      </div>
      <div className="flex-1 p-6 space-y-2">
        <h5 className="mb-2 text-2xl font-extrabold text-blue-gray-900">
          {truncateText(lecture.title, 15)}
        </h5>
        <p className="text-base font-light text-gray-700">
          <strong className="font-bold" >Palestrante:</strong> {truncateText(lecture.lecturer, 15)}
        </p>
        <p className="text-base font-light text-gray-700">
          <strong className="font-bold">Descrição: </strong>{truncateText(lecture.description, 20)}
        </p>
        <p className="text-base font-light text-gray-700 mb-6">
          <strong className="font-bold">Palestra do tipo:</strong> {lecture.type}
        </p>

        <time className="mt-6" dateTime={dateRelativeNow(lecture.createdAt)} title={lecture.createdAt}>
          Criado {dateRelativeNow(lecture.createdAt)}
        </time>
      </div>

      <div className="p-6 mt-auto flex justify-between items-center">
        <Button text="Ver mais" onClick={onClick} data-ripple-light="true" />
        <Tooltip isVisible={isTooltipVisible} onClickOutside={hideTooltip} position={tooltipPosition}>
          <ShareTooltip url={shareUrl} lecture={lecture} />
        </Tooltip>
        <Button
          icon={<ShareIcon className="h-4 w-4 rounded-full" />}
          onClick={toggleTooltip}
          ref={buttonRef} 
        />
      </div>
    </div>
  );
};

export default CardLecture;
