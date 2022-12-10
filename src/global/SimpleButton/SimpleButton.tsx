import React from "react";
import { FiSearch } from "react-icons/fi";

//loading

type SimpleButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  className?: string;
  icon?: JSX.Element;
  handelClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  searchBtn?: boolean;
};

const SimpleButton = ({
  type = "button",
  text,
  icon,
  className,
  handelClick,
  searchBtn,
}: SimpleButtonProps) => {
  return (
    <button
      type={searchBtn ? "submit" : type}
      className={`btn ${searchBtn ? "full-gray-btn" : ""} ${className}`}
      onClick={handelClick}
    >
      <span>{searchBtn ? "جستجو" : text}</span>
      {icon && <span>{icon} </span>}
      {searchBtn && (
        <span>
          <FiSearch size={25} className="text-darkGray" />
        </span>
      )}
    </button>
  );
};

export default SimpleButton;
