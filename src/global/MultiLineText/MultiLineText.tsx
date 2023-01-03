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
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  wrapperClassName?: string;
};
const MultiLineText = ({
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
}: InputTextProps) => {
  return (
    <div className={`flex flex-col w-full ${wrapperClassName}`}>
      <div className={`autocompleteWrapper !h-full !p-2 ${classNames} ${error && "border-red"} ${readOnly && "opacity-40"} `}>
        <div className={`autocompleteLabel  ${error && "text-red"} top-[-17px]`}>
          {label} <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
        </div>
        <textarea disabled={readOnly} className="autocompleteInput" name={name} value={values} onChange={handleChange} placeholder={placeholder} />
      </div>
      <p className="text-red text-xs pr-3 h-4 mt-1">{error}</p>
    </div>
  );
};

export default MultiLineText;
