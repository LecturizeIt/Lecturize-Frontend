import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

type ErrorNotificationProps = {
  error: string | undefined;
}

export const ErrorNotification = ({ error }: ErrorNotificationProps): JSX.Element | null => {
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  useEffect(() => {
    if (error && error.length > 0) {
      setShouldShow(true);
      setTimeout(() => setShouldShow(false), 2000);
    }
  }, [error]);

  if (!error) return null;

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
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 font-bold p-4 bg-red-500 text-white text-center rounded-lg shadow-lg">
        <p className="text-sm whitespace-pre-wrap">
          {error}
        </p>
      </div>
    </Transition>
  );
};
