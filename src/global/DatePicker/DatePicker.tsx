import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import persian from "react-date-object/calendars/persian";
import "react-multi-date-picker/styles/colors/red.css";
interface PropType {
  title?: string;
  handleChange?: any;
  name?: string;
  values?: any;
  time?: boolean;
  timeName?: string;
  timeValues?: any;
  error?: any;
  important?: boolean;
}

const DatePickers = ({ title, name, values, handleChange, time, timeValues, timeName, error, important }: PropType) => {
  const timePlugin = [<TimePicker position="bottom" hideSeconds />];
   // @ts-ignore
  // const timeConvert=time && new Date(null,null,null,timeValues?.split(":")[0],timeValues?.split(":")[1])

  return (
    <div className="flex flex-col">
      <div className={`relative border ${error ? "border-red" : "border-darkBorder"} rounded-lg w-60`}>
        <div className={`autocompleteLabel  ${error && "text-red"} z-10 -top-4`}>
          {title} <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
        </div>
        <DatePicker
          className="red"
          calendar={persian}
          name={name}
          value={
            time
              ? `${values?.year + "/" + values?.month + "/" + values?.day} ${timeValues}`
              : `${values?.year + "/" + values?.month + "/" + values?.day}`
          }
          locale={persian_fa}
          format={time ? `YYYY/MM/DD HH:mm` : "YYYY/MM/DD"}
          calendarPosition="bottom-right"
          // placeholder={`${values?.day} / ${values?.month} / ${values?.year}       ${time && `${timeValues?.hour}:${timeValues?.minute}`}`}
          onChange={(date: any) => {
            handleChange(name, {
              day: Number(date.day),
              month: Number(date.month),
              year: Number(date.year),
            });
            time && handleChange(timeName, date.hour + ":" + date.minute);
          }}
          render={<InputIcon />}
          plugins={time ? timePlugin : []}
        />
      </div>
      <p className="text-red text-xs pr-3 h-4 mt-1">{error}</p>
    </div>
  );
};

export default DatePickers;
