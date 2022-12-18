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

const TimePickers = ({ title, name, values, handleChange, timeValues, timeName, error, important }: PropType) => {
  const timePlugin = [<TimePicker position="bottom" hideSeconds />];
  const t="02:20"
  return (
    <div className="flex flex-col">
      <div className={`relative border ${error ? "border-red" : "border-darkBorder"} rounded-lg w-60`}>
        <div className={`autocompleteLabel  ${error && "text-red"} z-10 -top-4`}>
          {title} <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
        </div>
        <DatePicker
          className="red"
          disableDayPicker
          editable={false}
          value={t}
          calendar={persian}
          name={'fdgfd'}
          locale={persian_fa}
          format="HH:mm"
          calendarPosition="bottom-right"
        //   placeholder= {`${time && `${timeValues?.hour}:${timeValues?.minute}`}
          onChange={(date: any) => {
            console.log("fsdfdfdhgfh",date.hour + ":" + date.minute)
            //  handleChange(timeName, date.hour + ":" + date.minute);
          }}

          plugins={timePlugin}
        />
      </div>
      <p className="text-red text-xs pr-3 h-4 mt-1">{error}</p>
    </div>
  );
};

export default TimePickers;
