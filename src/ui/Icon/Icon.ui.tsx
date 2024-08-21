import React from "react";

import { uiIconTypeToSvgMap } from "./icon-type-svg.map";
import { TUiIconTypes } from "./icon-types.enum";

type IconProps = {
  type: TUiIconTypes;
  className?: string;
}

export type { TUiIconTypes };
export const Icon: React.FC<IconProps> = ({ type, className }) => {
  return (
    <img src={uiIconTypeToSvgMap.get(type)} alt={`icone ${type}`} role={type} className={className} />
  );
};
