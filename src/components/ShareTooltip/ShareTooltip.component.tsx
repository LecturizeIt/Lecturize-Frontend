import React from "react";
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton, FacebookIcon, WhatsappIcon, LinkedinIcon, TwitterShareButton, XIcon } from "react-share";
import { ILectureModel } from "../../domain/models/lecture.model";
import { shareLecture } from "../../api/lecture";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";

type ShareTooltipProps = {
  url: string;
  lecture: ILectureModel;
}

const ShareTooltip: React.FC<ShareTooltipProps> = ({ url, lecture }) => {

  const handleShareLecture = async () => {
    if (lecture.id !== undefined) { 
      try {
        await shareLecture(lecture.id);
        
      } catch (error) {
        <ErrorNotification error={`Error ao compartilar palestra: ${error}`}/>;
      }
    }
  };


  return (
    <div className="flex gap-4">
      <FacebookShareButton onClick={handleShareLecture} url={url} aria-label="Compartilhar no Facebook">
        <FacebookIcon className="w-8 h-8 rounded-lg"/>
      </FacebookShareButton>
      <WhatsappShareButton onClick={handleShareLecture} url={url} title={lecture.title} aria-label="Compartilhar no WhatsApp">
        <WhatsappIcon className="w-8 h-8 rounded-lg"/>
      </WhatsappShareButton>
      <LinkedinShareButton onClick={handleShareLecture} url={url} title={lecture.title} summary={lecture.description} aria-label="Compartilhar no LinkedIn">
        <LinkedinIcon className="w-8 h-8 rounded-lg"/>
      </LinkedinShareButton>
      < TwitterShareButton onClick={handleShareLecture} url={url} title={lecture.title} >
        <XIcon className="w-8 h-8 rounded-lg"/>
      </TwitterShareButton>
    </div>
  );
};

export default ShareTooltip;
