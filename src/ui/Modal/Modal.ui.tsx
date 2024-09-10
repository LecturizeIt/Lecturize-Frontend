import { useCallback, useRef, useEffect, useState } from "react";

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal ({ children, onClose }: ModalProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);

  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        handleDismiss();
      }
    },
    [handleDismiss, overlay, wrapper],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    },
    [handleDismiss],
  );

  useEffect(() => {
    setIsVisible(true);
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
      <div
        ref={overlay}
        className={`fixed inset-0 bg-black/60 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClick}
        role="presentation"
      />

      <div
        ref={wrapper}
        className={`relative w-[100%] h-[100%] md:max-h-[80svh] sm:max-w-[600px] md:max-w-[900px] rounded-none md:rounded-lg md:p-5 bg-white flex items-center justify-center overflow-auto transform transition-transform duration-500 ${isVisible ? "scale-100" : "scale-95"}`}
      >
        <button
          className="z-10 absolute top-4 right-4 border-2 border-black/35 bg-white rounded-full p-2 hover:bg-opacity-100 transition"
          onClick={handleDismiss}
          data-testid="close-modal"
        >
          <svg
            className="w-[10px] h-[10px] text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}