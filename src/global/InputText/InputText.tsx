type InputTextProps = {
  error?: any;
  values: any;
  label: string;
  name: string;
  type?: string;
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
}: InputTextProps) => {
  return (
    <>
      <div className={`autocompleteWrapper ${error && "border-red-700"}  `}>
        <div className={`autocompleteLabel ${error && "text-red-700"} `}>
          {label} {important && <span className="text-tomato">*</span>}
        </div>
        <input
          className="autocompleteInput"
          name={name}
          onChange={handleChange}
          type={type}
        />
      </div>
      {error && <p className="text-red-700 text-xs pr-3">{error}</p>}
    </>
  );
};

export default InputText;
