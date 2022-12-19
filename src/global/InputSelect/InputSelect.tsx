import { FC } from "react";
import Select from "react-select";

interface InputSelectProps {
  label?: string;
  name?: string;
  // blure?: React.FocusEventHandler<HTMLInputElement>;
  values?: any;
  options?: any;
  handleChange?: any;
  error?: any;
  important?: boolean;
  wrapperClassName?: string;
  isMulti?: boolean;
  isDisabled?:boolean;
}

const InputSelect: FC<InputSelectProps> = ({
  label,
  name,
  // blure,
  values,
  options,
  handleChange,
  error,
  important,
  wrapperClassName,
  isMulti,
  isDisabled
}): JSX.Element => {

  //This is custom Style for react-select 
  const style = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused
        ? error
          ? "1px solid  #d32f2f"
          : " 1px solid #ababab"
        : error
        ? "1px solid  #d32f2f"
        : " 1px solid #ababab",
      borderRadius: state.isFocused ? "0.5rem" : "0.5rem",
      height: state.isFocused ? "2.5rem" : "2.5rem",
      "&:hover": {
        border: state.isFocused
          ? error
            ? "1px solid  #d32f2f"
            : " 1px solid #ababab"
          : error
          ? "1px solid  #d32f2f"
          : " 1px solid #ababab",
      },
      // This line disable the blue border
      boxShadow: "none",
      width: "100%",
    }),
  };

  return (
    <div className={`relative  ${wrapperClassName}`}>
      <label
        className={` absolute top-[-16px] right-5 bg-white z-10  px-2  text-sm ${
          error ? "text-red" : "text-darkGray"
        }`}
      >
        {label}{" "}
        <span className="text-tomato font-extrabold text-lg h-4">
          {important ? "*" : " "}
        </span>
      </label>
      <Select
        isMulti={isMulti}

        isLoading={options ? false : true}
        value={
          options ? options.find((option: any) => option.label === values) : ""
        }
        defaultInputValue={values?.text}
        onChange={(option) =>
          handleChange(name, {
            id: option?.value,
            text: option?.label,
          })
        }
        styles={style}
        options={options && options.map((res: any) => {
          return {
            label: res?.text,
            value: res?.id,
          };
        })}
        isDisabled={isDisabled}
        placeholder=""
        isRtl
        name={name}
        className="inputSelect focus:outline-none flex"
      />
      <p className="text-red text-xs pr-3 h-4 mt-1">{error?.text}</p>
    </div>
  );
};

InputSelect.defaultProps = {
  wrapperClassName: "w-60",
};
export default InputSelect;
