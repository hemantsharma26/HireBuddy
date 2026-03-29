import * as icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

export const IconRenderer = ({ name, ...props }: IconProps) => {
  const IconComponent = (icons as any)[name];

  if (!IconComponent) {
    // Fallback icon if the specified one isn't found
    return <icons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};
