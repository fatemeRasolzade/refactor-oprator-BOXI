import { FC } from "react";
import Switch from "react-switch";
interface CustomSwitchProps {
  active: boolean;
  handleChange: (checked: boolean, event: MouseEvent | React.SyntheticEvent<MouseEvent | KeyboardEvent, Event>) => void;
  label?: string;
}

const CustomSwitch: FC<CustomSwitchProps> = ({ handleChange, active, label }): JSX.Element => {
  return (
    <div>
      <label className="flex justify-center items-center flex-row-reverse w-fit">
        <span className="mr-2 w-20">{label ? label : active ? "فعال" : "غیر فعال"}</span>
        <Switch
          onChange={handleChange}
          checked={active}
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
