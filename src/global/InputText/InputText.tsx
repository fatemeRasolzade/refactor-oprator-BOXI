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
    }: InputTextProps,
    ref: any
  ) => {
    const [HidePassword, setHidePassword] = useState(true);
    // console.log(error);

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
            type={!HidePassword ? "password" : type}
            placeholder={placeholder}
          />
          {password && (
            <div className="text-darkBorder cursor-pointer" onClick={() => setHidePassword(!HidePassword)}>
              {HidePassword ? <BiHide size={20} /> : <BiShow size={20} />}
            </div>
          )}
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
