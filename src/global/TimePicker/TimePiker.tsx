import React from 'react'
import DatePicker from 'react-multi-date-picker'
import persian_fa from "react-date-object/locales/persian_fa"
import TimePicker from "react-multi-date-picker/plugins/time_picker";


interface PropTime {
    title?:string,
    handleChange?:any
}

const TimePiker = ({title,handleChange}:PropTime) => {
  return (
    <>
    <label className='relative'>
   <h6 className='absolute -top-25 bg-white right-10'>{title}</h6>
      <DatePicker
     
      name='test'
      style={{textAlign:"center",width:"258px",height:"38px"}}
      placeholder='00 : 00'
      locale={persian_fa}
  disableDayPicker
  format="hh:mm:ss A"
  onChange={handleChange}
  plugins={[
    <TimePicker />
  ]} 
/>

</label>

    </>
  )
}

export default TimePiker