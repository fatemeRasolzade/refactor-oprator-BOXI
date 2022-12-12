type InputTextProps = {
  error?: any;
  values: any;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  important?: boolean;
  readOnly?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string
};
const InputText = ({
  label,
  name,
  handleChange,
  type = "text",
  important,
  error,
  placeholder,
  readOnly,
  values,
  wrapperClassName
}: InputTextProps) => {
  return (
    <div className={`flex flex-col ${wrapperClassName} `}>
      <div
        className={`autocompleteWrapper ${error && "border-red"} ${
          readOnly && "opacity-40"
        } `}
      >
        <div
          className={`autocompleteLabel ${error && "text-red"} top-[-17px]`}
        >
          {label}{" "}
          <span className="text-tomato font-extrabold text-lg h-4">
            {important ? "*" : " "}
          </span>
        </div>
        <input
          disabled={readOnly}
          className="autocompleteInput"
          name={name}
          value={values}
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
        />
      </div>
      <p className="text-red text-xs pr-3 h-4 mt-1">{error}</p>
    </div>
  );
};

InputText.defaultProps = {
  wrapperClassName: "w-60",
};

export default InputText;
