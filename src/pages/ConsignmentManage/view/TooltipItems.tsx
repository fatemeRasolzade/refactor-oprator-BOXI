import React, { FC } from "react";
import TooltipWrapper from "../../../global/tooltip/TooltipWrapper";

interface TooltipItemsProps {
  ArrayValue: any;
}
const TooltipItems: FC<TooltipItemsProps> = ({ ArrayValue }): JSX.Element => {
  console.log("ArrayValue", ArrayValue);

  return (
    <div className="w-full flex justify-center">
      <TooltipWrapper
        textProps={ArrayValue.map((value: any, index: number) => (
          <div className="text-white" key={index}>
            {value.text}
          </div>
        ))}
      >
        <div>{ArrayValue.map((value: any) => value.text)}</div>
      </TooltipWrapper>
    </div>
  );
};

export default TooltipItems;
