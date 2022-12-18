import React, { useState } from 'react'
import SimpleButton from './../../../../global/SimpleButton/SimpleButton';
import { BiPlus } from 'react-icons/bi';
import CustomSwitch from '../../../../global/Switch/Switch';
import { GoDesktopDownload } from 'react-icons/go';

const OptionTableProductGroup = ({addGroup,ExportExcel}:{addGroup?:React.MouseEventHandler<HTMLButtonElement> | undefined,ExportExcel?:React.MouseEventHandler<HTMLButtonElement> | undefined}) => {

const [active,setActive]=useState(false)

const handelSwitch=()=>{
    setActive(prev=>!prev)
}

  return (
    <div className='flex-start-center mt-5 gap-3'>
<SimpleButton
      type={'button'}
      className="w-[240px] h-[40px] bg-tomato text-white flex flex-row-reverse "
      icon={<BiPlus size={25} className="text-white" />}
      text="افزودن گروه محصول"
      handelClick={addGroup}
     
    />

<CustomSwitch active={active} handleChange={handelSwitch}/>

<SimpleButton
      type={'button'}
      className=" bg-transparent text-dark flex flex-row-reverse p-0"
      icon={<GoDesktopDownload color="black" />}
      text="خروجی اکسل"
     handelClick={ExportExcel}
    />


    </div>
  )
}

export default OptionTableProductGroup