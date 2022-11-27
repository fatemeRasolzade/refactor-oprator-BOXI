import DatePicker  from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon"

interface PropType{
  title?:string,
  handelChange?: any,
  name?:string,
  values?:string
}


const DatePickers = ({title,name,values}:PropType) => {

const handelChange=(e:any)=>console.log(e)

  return (
    <>
     <label >
      <span className="block">{title}</span>
      <DatePicker
      
      className="myclassDate"
// calendar={persian}
name={name}
value={values}
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
</label>

</>
  )
}

export default DatePickers