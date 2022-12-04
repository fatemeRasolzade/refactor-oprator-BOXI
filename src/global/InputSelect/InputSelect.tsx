import Select from "react-select";
const InputSelect = ({
  label,
  handleChange,
  name,
  // blure,
  values,
  options,
}: {
  label?: string;
  handleChange?: any;
  name?: string;
  // blure?: React.FocusEventHandler<HTMLInputElement>;
  values?: any;
  options?: any;
}) => {
  const style = {
    control: (base: any) => ({
      ...base,

      // This line disable the blue border
      boxShadow: "none",
      width: "100%",
    }),
  };

  return (
    <>
      <label>
        <span>{label}</span>
      </label>
      <Select
        isLoading={options.length > 0 ? false : true}
        value={
          options ? options.find((option: any) => option.label === values) : ""
        }
        defaultInputValue={values.text}
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
    </>
  );
};

export default InputSelect;
