import { Tooltip } from "@material-tailwind/react";
import React, { FC } from "react";
interface TooltipWrapperProps {
  children?: any;
  textProps?: string;
}
const TooltipWrapper: FC<TooltipWrapperProps> = ({ children, textProps }) => {
  return (
    <Tooltip content={textProps}>
      <div className="max-w-[200px] text-ellipsis overflow-hidden max-h-[20px]">
        {children}
      </div>
    </Tooltip>
  );
};

export default TooltipWrapper;
