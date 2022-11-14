import DatePicker  from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon"
const DatePickers = () => {

const handelChange=(e:any):void=>{}

  return (
    <div>
      <fieldset className="p-3">
      <legend>شروع کار</legend>
      <DatePicker
// calendar={persian}
locale={persian_fa}
format="MM/DD/YYYY HH:mm:ss"
calendarPosition="bottom-right"
onChange={handelChange}
render={<InputIcon/>}
  plugins={[
   <DatePanel />,
   <TimePicker/>
  ]}
/>
      </fieldset>

</div>
  )
}

export default DatePickers