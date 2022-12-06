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
  const [check, setCheck] = useState(false);

  const handleChanges = (e: boolean) => {
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
          onChange={handleChanges}
          checked={check}
          onColor="#FFEAE9"
          offColor="#F9FAFC"
          onHandleColor="#EF5644"
          offHandleColor="#e7e5e5"
          width={40}
          height={20}
        />
      </label>
    </div>
  );
};

export default CustomSwitch;
