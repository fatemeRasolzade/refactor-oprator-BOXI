import React from 'react'
import DatePicker from 'react-multi-date-picker'
import persian_fa from "react-date-object/locales/persian_fa"
import TimePicker from "react-multi-date-picker/plugins/time_picker";

interface PropTime {
    title?:string,
    handelChange?:any
}

const TimePiker = ({title,handelChange}:PropTime) => {
  return (
    <>
     <fieldset className="py-1 px-2 w-fit border-white rounded-xl">
      <legend>{title}</legend>

      <DatePicker
      style={{textAlign:"center",width:"258px",height:"38px"}}
      placeholder='00 : 00'
      locale={persian_fa}
  disableDayPicker
  format="hh:mm:ss A"
  onChange={handelChange}
  plugins={[
    <TimePicker />
  ]} 
/>

      </fieldset>

    </>
  )
}

export default TimePiker