import React from "react";

type SimpleButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  className?: string;
  icon?: JSX.Element;
  handelClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const SimpleButton = ({
  type = "button",
  text,
  icon,
  className,
  handelClick,
}: SimpleButtonProps) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={handelClick}>
      <span>{text}</span>
      {icon && <span>{icon} </span>}
    </button>
  );
};

export default SimpleButton;
