import React from "react";

const Checkbox = ({
  title,
  handleChange,
  name,
  blure,
  values,
}: {
  title?: string;
  handleChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  blure?: React.FocusEventHandler<HTMLInputElement>;
  values?: boolean;
}) => {
  return (
    <div className="flex-start-center gap-2">
      <input
        type="checkbox"
        className="accent-tomato w-4 h-4"
        onChange={handleChange}
        name={name}
        onBlur={blure}
        checked={values}
        style={{ borderRadius: "50%" }}
      />
      <label className="text-darkGray">{title}</label>
    </div>
  );
};

// border-radius: 50%;
// vertical-align: middle;
// border: 1px solid #ddd;
// appearance: none;
// -webkit-appearance: none;
// outline: none;
// cursor: pointer;

export default Checkbox;
