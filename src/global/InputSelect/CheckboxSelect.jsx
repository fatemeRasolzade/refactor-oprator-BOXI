import { useState } from "react";
import Select, { components } from "react-select";


const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex "
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} className='ml-2'/>
      {children}
    </components.Option>
  );
};

const allOptions = [
  { value: "option 1", label: "option 1" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" }
];

const CheckboxSelect=({text,change})=> {

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none"
    })
  };


  return (
    <div className='w-258 h-48'>
       {/* <fieldset className='border-white rounded-lg'>
        <legend style={{lineHeight:'0.8',marginRight:'10px'}}>{text}</legend> */}
      <Select
        className="checkbox_select"
        isMulti
        styles={style}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
       placeholder=""
        options={allOptions}
        onChange={change}
        components={{ Option: InputOption}}
      />
    {/* </fieldset> */}
    </div>
  );
}
export default CheckboxSelect