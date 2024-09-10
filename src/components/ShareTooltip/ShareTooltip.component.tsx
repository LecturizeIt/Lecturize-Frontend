import React from "react";
import { FacebookShareButton, WhatsappShareButton, LinkedinShareButton } from "react-share";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { ILectureModel } from "../../domain/models/lecture.model";

type ShareTooltipProps = {
  url: string;
  lecture: ILectureModel;
}

const ShareTooltip: React.FC<ShareTooltipProps> = ({ url, lecture }) => {
  return (
    <div className="flex gap-4">
      <FacebookShareButton url={url} aria-label="Compartilhar no Facebook">
        <FaFacebookF />
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={lecture.title} aria-label="Compartilhar no WhatsApp">
        <FaWhatsapp />
      </WhatsappShareButton>
      <LinkedinShareButton url={url} title={lecture.title} summary={lecture.description} aria-label="Compartilhar no LinkedIn">
        <FaLinkedinIn />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareTooltip;
