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
}

const DatePickers = ({ title, name, values, handleChange, time, timeValues, timeName }: PropType) => {
  return (
    <>
      <div>
        <span className="block">{title}</span>
        <DatePicker
          className="red"
          calendar={persian}
          name={name}
          locale={persian_fa}
          format="MM/DD/YYYY HH:mm"
          calendarPosition="bottom-right"
          placeholder={`${values?.day} / ${values?.month} / ${values?.year}       ${time && `${timeValues?.hour}:${timeValues?.minute}`}`}
          onChange={(date: any) => {
            handleChange(name, {
              day: Number(date.day),
              month: Number(date.month),
              year: Number(date.year),
            });
            time && handleChange(timeName, date.hour + ":" + date.minute);
          }}
          render={<InputIcon />}
          plugins={[<TimePicker position="bottom" hideSeconds />]}
        />
      </div>
    </>
  );
};

export default DatePickers;
