import React from "react";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

type PropTime = {
  title?: string;
  error?: any;
  values?: any;
  label?: string;
  name?: string;
  placeholder?: string;
  important?: boolean;
  readOnly?: boolean;
  classNames?: string;
  handleChange?: any;
  wrapperClassName?: string;
  disabled?:boolean
};

const TimePiker = ({
  values,
  title,
  disabled,
  handleChange,
  wrapperClassName,
  classNames,
  readOnly,
  important,
  label,
  error,
  name,
}: PropTime) => {
  // @ts-ignore
  const time = new Date(null, null, null, values?.split(":")[0], values?.split(":")[1]);


  return (
    <>
      <div className={`flex flex-col ${wrapperClassName}`}>
        <div className={`autocompleteWrapper ${classNames} ${error && "border-red"} ${readOnly && "opacity-40"} `}>
          <div className={`autocompleteLabel  ${error && "text-red"} top-[-17px]`}>
            {label} <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
          </div>
          <DatePicker
            name={name}
            disabled={disabled}
            inputClass="autocompleteInput text-center"
            placeholder="00 : 00"
            locale={persian_fa}
            disableDayPicker
            format="HH:mm"
            value={time}
            onChange={handleChange}
            // onChange={(date: any) => {
            //   handleChange(name, date.hour + ":" + date.minute);
            // }}
            plugins={[<TimePicker hideSeconds />]}
          />
        </div>
        <p className="text-red text-xs pr-3 h-4 mt-1">{error}</p>
      </div>
    </>
  );
};

export default TimePiker;
