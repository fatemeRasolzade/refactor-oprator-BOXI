import React, { useState } from "react";
import ChipIcon from "../../../../../global/ChipIcon/ChipIcon";
import CustomSwitch from "../../../../../global/Switch/Switch";

const SwitchTooltip = ({
  active,
  handelchanges,
  tooltipText,
}: {
  active: boolean;
  handelchanges?: any;
  tooltipText?: string;
}) => {
  const [isActive, setIsActive] = useState(active);
  return (
    <div className="flex justify-between items-center ">
      <div className="px-2 w-full">
        <ChipIcon text={tooltipText} id="" />
      </div>

      <div className="px-2 w-full flex justify-end">
        <CustomSwitch
          active={isActive}
          handleChange={(e) => {
            setIsActive(e);
            handelchanges(e);
          }}
        />
      </div>
    </div>
  );
};

export default SwitchTooltip;
