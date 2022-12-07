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
}): JSX.Element => {
  const style = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? " 1px solid #ababab" : "1px solid #ababab",
      borderRadius: state.isFocused ? "0.5rem" : "0.5rem",
      height: state.isFocused ? "2.5rem" : "2.5rem",
      "&:hover": {
        border: state.isFocused ? " 1px solid #ababab" : "1px solid #ababab",
      },
      // This line disable the blue border
      boxShadow: "none",
      width: "100%",
    }),
  };

  return (
    <div className={`relative  ${wrapperClassName}`}>
      <label className=" absolute top-[-16px] right-5 bg-white z-10  px-2 text-darkGray text-sm">
        {label}
        <span className="text-tomato font-extrabold text-lg h-4">
          {important ? "*" : " "}
        </span>
      </label>
      <Select
        isLoading={options.length > 0 ? false : true}
        value={
          options ? options.find((option: any) => option.label === values) : ""
        }
        defaultInputValue={values?.text}
        onChange={(option) =>
          handleChange(name, {
            id: option.value,
            text: option.label,
          })
        }
        styles={style}
        options={options.map((res: any) => {
          return {
            label: res.text,
            value: res.id,
          };
        })}
        placeholder=""
        isRtl
        name={name}
        className="inputSelect focus:outline-none"
      />
      <p className="text-red-700 text-xs pr-3 h-4">{error}</p>
    </div>
  );
};

InputSelect.defaultProps = {
  wrapperClassName: "w-60",
};
export default InputSelect;
