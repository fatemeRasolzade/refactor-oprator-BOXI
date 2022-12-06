type InputTextProps = {
  className?: string;
  error?: any;
  values: any;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  important?: boolean;
  readOnly?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputText = ({
  className,
  label,
  name,
  handleChange,
  type = "text",
  important,
  error,
  placeholder,
  readOnly,
  values,
}: InputTextProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className={`autocompleteWrapper ${error && "border-red-700"} ${
          readOnly && "opacity-40"
        } `}
      >
        <div
          className={`autocompleteLabel ${error && "text-red-700"} top-[-17px]`}
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
      <p className="text-red-700 text-xs pr-3 h-4 mt-1">{error}</p>
    </div>
  );
};

export default InputText;
