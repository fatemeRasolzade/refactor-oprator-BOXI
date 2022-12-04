import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";

interface Toggle {
  name: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
interface PropAddButton {
  text?: string;
  RightIcon?: JSX.Element;
  LeftIcon?: JSX.Element;
  ToggleOptions?: Toggle[];
}

const AddButton = ({
  text = "افزودن",
  RightIcon = <BiPlus size={23} />,
  LeftIcon = <RiArrowDownSLine size={23} />,
  ToggleOptions = [],
}: PropAddButton) => {
  const [toggle, setToggle] = useState(false);

  const handleBlur = (e: {
    currentTarget: { contains: (arg0: any) => any };
    relatedTarget: any;
  }) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setToggle(false);
  };

  return (
    <div className="relative w-44" onBlur={handleBlur}>
      <button
        className={`btn full-tomato-btn w-full`}
        onClick={() => setToggle(!toggle)}
      >
        <span>{RightIcon}</span>
        <span className="px-5">{text}</span>
        <span>{LeftIcon}</span>
      </button>
      {toggle
        ? ToggleOptions?.length > 0 && (
            <div className="ToggleContainer ">
              {ToggleOptions.map((item) => (
                <button className="ToggleElements" onClick={item.handleClick}>
                  {item.name}
                </button>
              ))}
            </div>
          )
        : null}
    </div>
  );
};

export default AddButton;
