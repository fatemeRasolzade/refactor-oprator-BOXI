type InputTextProps = {
  error?: any;
  values: any;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  important?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputText = ({
  label,
  name,
  handleChange,
  type = "text",
  important,
  error,
  placeholder,
}: InputTextProps) => {
  return (
    <div className="flex flex-col">
      <div className={`autocompleteWrapper ${error && "border-red-700"}  `}>
        <div
          className={`autocompleteLabel ${error && "text-red-700"} top-[-17px]`}
        >
          {label}{" "}
          {important && (
            <span className="text-tomato font-extrabold text-lg">*</span>
          )}
        </div>
        <input
          className="autocompleteInput"
          name={name}
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
        />
      </div>
      <p className="text-red-700 text-xs pr-3 h-4">{error}</p>
    </div>
  );
};

export default InputText;
