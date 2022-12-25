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
  isDisabled?: boolean;
}
const MultiSelect: FC<InputSelectProps> = ({
  label,
  name,
  // blure,
  values,
  options,
  handleChange,
  error,
  important,
  isDisabled,
  wrapperClassName,
}): JSX.Element => {
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
    <div className={`relative min-w-[240px] h-fit custom-multi-select  ${wrapperClassName}`}>
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
        isMulti
        hideSelectedOptions={false}
        isDisabled={isDisabled}
        isLoading={options.length > 0 ? false : true}
        value={
          values
            ? values.map((item: any) => {
                return { value: item.id, label: item.text };
              })
            : []
        }
        onChange={(option) =>
          handleChange(
            name,
            option.map((item: any) => {
              return {
                id: item.value,
                text: item.label,
              };
            })
          )
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
        className="inputSelect focus:outline-none  "
      />
      <p className="text-red text-xs pr-3 h-4 mt-1">{error}</p>
    </div>
  );
};
MultiSelect.defaultProps = {
  wrapperClassName: "w-60",
};
export default MultiSelect;
