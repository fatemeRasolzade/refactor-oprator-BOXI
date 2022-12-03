import React from "react";

type SimpleButtonProps = {
  text?: string;
  className?: string;
  icon?: JSX.Element;
  handelClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const SimpleButton = ({
  text,
  icon,
  className,
  handelClick,
}: SimpleButtonProps) => {
  return (
    <button className={`btn ${className}`} onClick={handelClick}>
      {icon && <span>{icon} </span>}
      <span>{text}</span>
    </button>
  );
};

export default SimpleButton;
