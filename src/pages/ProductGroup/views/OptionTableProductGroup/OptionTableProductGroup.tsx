import React, { useState } from 'react'
import SimpleButton from './../../../../global/SimpleButton/SimpleButton';
import { BiPlus } from 'react-icons/bi';
import CustomSwitch from '../../../../global/Switch/Switch';

const OptionTableProductGroup = () => {

const [active,setActive]=useState(false)

const handelSwitch=()=>{
    setActive(prev=>!prev)
}

  return (
    <div>
<SimpleButton
      type={'submit'}
      className="w-[240px] h-[40px] bg-tomato text-white flex flex-row-reverse "
      icon={<BiPlus size={25} className="text-white" />}
      text="افزودن گروه محصول"
     
    />

<CustomSwitch active={active} handleChange={handelSwitch}/>

    </div>
  )
}

export default OptionTableProductGroup