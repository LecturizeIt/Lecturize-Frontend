import React, { useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";

type TooltipProps = {
  children: React.ReactNode;
  isVisible: boolean;
  onClickOutside: () => void;
  position: { top: number; left: number };
};

const Tooltip: React.FC<TooltipProps> = ({ children, isVisible, onClickOutside, position }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <Transition
      show={isVisible}
      enter="transition-opacity duration-150 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-75 ease-in"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        ref={tooltipRef}
        className="absolute bg-white border border-[#861efd] text-[#861efd] text-xs rounded-lg py-2 px-6 shadow-lg"
        style={{ top: position.top, left: position.left, zIndex: 1000 }}
      >
        {children}
      </div>
    </Transition>
  );
};

export default Tooltip;
