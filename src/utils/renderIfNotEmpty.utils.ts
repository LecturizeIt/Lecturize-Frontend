import { ReactNode } from "react";

export const renderIfNotEmpty = (
  value: string | number | boolean | null | undefined,
  renderContent: () => ReactNode
): ReactNode | null => {
  return value ? renderContent() : null;
};
