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
  className?: string;
  WrapperClassName?: string;
}

const AddButton = ({
  text = "افزودن",
  RightIcon = <BiPlus size={23} />,
  LeftIcon = <RiArrowDownSLine size={23} />,
  ToggleOptions = [],
  className,
  WrapperClassName,
}: PropAddButton) => {
  const [toggle, setToggle] = useState(false);

  const handleBlur = (e: { currentTarget: { contains: (arg0: any) => any }; relatedTarget: any }) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setToggle(false);
  };

  return (
    <div className={`relative ${WrapperClassName}`} onBlur={handleBlur}>
      <button className={`btn w-full ${className}`} onClick={() => setToggle(!toggle)}>
        <span>{RightIcon}</span>
        <span>{text}</span>
        <span className={`${toggle && "rotate-180"} transition-all duration-500`}>{LeftIcon}</span>
      </button>
      {toggle
        ? ToggleOptions?.length > 0 && (
            <div className="ToggleContainer ">
              {ToggleOptions.map((item, index) => (
                <button key={index} className="ToggleElements" onClick={item.handleClick}>
                  {item.name}
                </button>
              ))}
            </div>
          )
        : null}
    </div>
  );
};

AddButton.defaultProps = {
  WrapperClassName: "w-44",
  className: "full-tomato-btn gap-5",
};

export default AddButton;
