import React from "react";
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton, FacebookIcon, WhatsappIcon, LinkedinIcon, TwitterShareButton, XIcon } from "react-share";
import { ILectureModel } from "../../domain/models/lecture.model";

type ShareTooltipProps = {
  url: string;
  lecture: ILectureModel;
}

const ShareTooltip: React.FC<ShareTooltipProps> = ({ url, lecture }) => {
  return (
    <div className="flex gap-4">
      <FacebookShareButton url={url} aria-label="Compartilhar no Facebook">
        <FacebookIcon className="w-8 h-8 rounded-lg"/>
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={lecture.title} aria-label="Compartilhar no WhatsApp">
        <WhatsappIcon className="w-8 h-8 rounded-lg"/>
      </WhatsappShareButton>
      <LinkedinShareButton url={url} title={lecture.title} summary={lecture.description} aria-label="Compartilhar no LinkedIn">
        <LinkedinIcon className="w-8 h-8 rounded-lg"/>
      </LinkedinShareButton>
      < TwitterShareButton url={url} title={lecture.title} >
        <XIcon className="w-8 h-8 rounded-lg"/>
      </TwitterShareButton>
    </div>
  );
};

export default ShareTooltip;
