import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import persian from "react-date-object/calendars/persian";
import "react-multi-date-picker/styles/colors/red.css";
interface PropType {
  title?: string;
  handleChange?: any;
  name?: string;
  values?: any;
}

const DatePickers = ({ title, name, values, handleChange }: PropType) => {
  return (
    <>
      <label>
        <span className="block">{title}</span>
        <DatePicker
          className="myclassDate red"
          calendar={persian}
          name={name}
          locale={persian_fa}
          format="MM/DD/YYYY HH:mm:ss"
          calendarPosition="bottom-right"
          placeholder={`${values.day} / ${values.month} / ${values.year}`}
          onChange={(date: any) =>
            handleChange(name, {
              day: Number(date.day),
              month: Number(date.month),
              year: Number(date.year),
            })
          }
          render={<InputIcon />}
          plugins={[<DatePanel />, <TimePicker />]}
        />
      </label>
    </>
  );
};

export default DatePickers;
