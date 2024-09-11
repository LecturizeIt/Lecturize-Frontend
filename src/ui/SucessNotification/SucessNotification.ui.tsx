import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

type SuccessNotificationProps = {
  message: string | undefined;
};

export const SuccessNotification = ({ message }: SuccessNotificationProps): JSX.Element | null => {
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  useEffect(() => {
    if (message && message.length > 0) {
      setShouldShow(true);
      setTimeout(() => setShouldShow(false), 2000); 
    }
  }, [message]);

  if (!message) return null;

  return (
    <Transition
      show={shouldShow}
      enter="transition duration-300"
      enterFrom="opacity-0 transform -translate-y-10"
      enterTo="opacity-100 transform translate-y-0"
      leave="transition duration-300"
      leaveFrom="opacity-100 transform translate-y-0"
      leaveTo="opacity-0 transform -translate-y-10"
    >
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 font-bold p-4 bg-green-500 text-white text-center rounded-lg shadow-lg">
        <p className="text-sm whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </Transition>
  );
};
