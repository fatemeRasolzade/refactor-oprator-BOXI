import React from "react";
import { FiSearch } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

type SimpleButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  className?: string;
  icon?: JSX.Element;
  handelClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  searchBtn?: boolean;
  loading?: boolean;
  disabled?: boolean;
  loadingColor?: string;
};

const SimpleButton = ({
  type = "button",
  text,
  icon,
  className,
  handelClick,
  searchBtn,
  loading,
  disabled,
  loadingColor = "#ffffff",
}: SimpleButtonProps) => {
  return (
    <button
      disabled={loading ? true : disabled}
      type={searchBtn ? "submit" : type}
      className={`btn ${searchBtn && "full-gray-btn"} ${
        disabled && "opacity-60"
      } ${className} px-0`}
      onClick={handelClick}
    >
      <span>{searchBtn ? "جستجو" : text}</span>
      {icon && <span>{icon} </span>}
      {searchBtn && (
        <span>
          <FiSearch size={25} className="text-darkGray" />
        </span>
      )}
      {loading && <ClipLoader size={20} color={loadingColor} />}
    </button>
  );
};

export default SimpleButton;
