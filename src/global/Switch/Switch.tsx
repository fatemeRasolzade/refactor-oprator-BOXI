import React, { useState } from 'react'
import Switch from "react-switch";
const CustomSwitch = () => {

const [check,setCheck]=useState(false)
const handleChange=(e:boolean)=>setCheck(e)
    
  return (
    <div>
<label className='flex justify-center items-center flex-row-reverse'>
        <span className='mr-2'>{check ? "فعال" : "غیر فعال"}</span>
        <Switch onChange={handleChange} checked={check} onColor="#FFEAE9" offColor='#c5c1c1' onHandleColor="#cf6054" offHandleColor='#8f8b8b' width={40} height={20}/>
      </label>
    </div>
  )
}

export default CustomSwitch