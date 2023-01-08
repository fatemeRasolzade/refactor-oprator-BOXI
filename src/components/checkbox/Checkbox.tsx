interface CheckboxProps {
  title?: string;
  handleChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  blure?: React.FocusEventHandler<HTMLInputElement>;
  values?: boolean;
  WrapperClassName?: string;
}

const Checkbox = ({ title, handleChange, name, blure, values, WrapperClassName }: CheckboxProps) => {
  return (
    <div className={`flex-start-center gap-2 my-auto ${WrapperClassName}`}>
      <input
        type="checkbox"
        className="accent-tomato w-4 h-4 mb-5"
        onChange={handleChange}
        name={name}
        onBlur={blure}
        checked={values}
        style={{ borderRadius: "50%" }}
      />
      <label className="text-darkGray mb-5">{title}</label>
    </div>
  );
};

Checkbox.defaultProps = {
  WrapperClassName: "w-60",
};

export default Checkbox;
