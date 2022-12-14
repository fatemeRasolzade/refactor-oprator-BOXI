import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import React from "react";

type InputTextProps = {
  error?: any;
  values?: any;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  important?: boolean;
  readOnly?: boolean;
  classNames?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  password?: boolean;
  leftIcon?: JSX.Element;
};
const InputText = React.forwardRef(
  (
    {
      classNames,
      label,
      name,

      handleChange,
      type = "text",
      important,
      error,
      placeholder,
      readOnly,
      values,
      wrapperClassName,
      password,
      leftIcon,
    }: InputTextProps,
    ref: any
  ) => {
    const [HidePassword, setHidePassword] = useState(false);

    return (
      <div className={`flex flex-col ${wrapperClassName}`}>
        <div className={`autocompleteWrapper ${classNames} ${error && "border-red"} ${readOnly && "opacity-40"} `}>
          <div className={`autocompleteLabel  ${error && "text-red"} top-[-17px]`}>
            {label} <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
          </div>
          <input
            ref={ref}
            disabled={readOnly}
            className="autocompleteInput"
            name={name}
            value={values}
            onChange={handleChange}
            type={password ? (!HidePassword ? "password" : type) : type}
            placeholder={placeholder}
          />
          {password && (
            <div className="text-darkBorder cursor-pointer pr-3" onClick={() => setHidePassword(!HidePassword)}>
              {!HidePassword ? <BiHide size={20} /> : <BiShow size={20} />}
            </div>
          )}
          {leftIcon && <span className="pr-3">{leftIcon}</span>}
        </div>
        <p className="text-red text-xs pr-3 h-4 mt-1">{error}</p>
      </div>
    );
  }
);

InputText.defaultProps = {
  wrapperClassName: "w-60",
};

export default InputText;
