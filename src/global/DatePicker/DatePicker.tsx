import DatePicker  from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon"
import persian from "react-date-object/calendars/persian"
interface PropType{
  title?:string,
  handelChange?: any,
  name?:string,
  values?:any
}


const DatePickers = ({title,name,values,handelChange}:PropType) => {
  return (
    <>
     <label >
      <span className="block">{title}</span>
      <DatePicker
      
      className="myclassDate"
 calendar={persian}
name={name}
locale={persian_fa}
format="MM/DD/YYYY HH:mm:ss"
calendarPosition="bottom-right"

onChange={(date:any)=>handelChange(name,{
  day:Number(date.day),
  month:Number(date.month),
  year:Number(date.year)
})}
render={<InputIcon/>}
  plugins={[
   <DatePanel />,
   <TimePicker/>
  ]}
/>
</label>

</>
  )
}

export default DatePickers

