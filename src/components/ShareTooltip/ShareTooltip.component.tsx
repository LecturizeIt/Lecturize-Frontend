import React from "react";
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton, FacebookIcon, WhatsappIcon, LinkedinIcon } from "react-share";
import { ILectureModel } from "../../domain/models/lecture.model";

type ShareTooltipProps = {
  url: string;
  lecture: ILectureModel;
}

const ShareTooltip: React.FC<ShareTooltipProps> = ({ url, lecture }) => {
  return (
    <div className="flex gap-4">
      <FacebookShareButton url={url} aria-label="Compartilhar no Facebook">
        <FacebookIcon />
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={lecture.title} aria-label="Compartilhar no WhatsApp">
        <WhatsappIcon />
      </WhatsappShareButton>
      <LinkedinShareButton url={url} title={lecture.title} summary={lecture.description} aria-label="Compartilhar no LinkedIn">
        <LinkedinIcon />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareTooltip;
