import React, { useState } from "react";
import Switch from "react-switch";
const CustomSwitch = ({
  handleChange,
  active,
  deactive,
}: {
  handleChange?: any;
  active?: string;
  deactive?: string;
}) => {
  const [check, setCheck] = useState(true);

  const handelChanges = (e: boolean) => {
    setCheck(!check);
    handleChange(e);
  };

  return (
    <div>
      <label className="flex justify-center items-center flex-row-reverse w-fit">
        {active && deactive ? (
          <span className="mr-2">{check ? "فعال" : "غیر فعال"}</span>
        ) : null}
        <Switch
          onChange={handelChanges}
          checked={check}
          onColor="#FFEAE9"
          offColor="#c5c1c1"
          onHandleColor="#cf6054"
          offHandleColor="#8f8b8b"
          width={40}
          height={20}
        />
      </label>
    </div>
  );
};

export default CustomSwitch;
