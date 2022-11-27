import React from 'react'
import { BiPlus,BiEdit,BiTrash } from 'react-icons/bi';
import BtnIcon from './../../global/BtnIcon/BtnIcon';
import { GrDocumentPdf } from "react-icons/gr";
import { GoDesktopDownload,GoGear } from "react-icons/go";
import CustomSwitch from './../../global/Switch/Switch';
import {useNavigate} from "react-router-dom"
const OptionsTable = () => {
  const navigate=useNavigate()
  return (
    <div className='mt-6'>
<ul className='flex gap-4 justify-start items-center flex-wrap'>
        <li><BtnIcon text='افزودن' color='tomato' colorText="white" icon={<BiPlus color='white' />} handelClick={()=>navigate('/hub/add')}/></li>
        <li><BtnIcon text='افزودن گروهی' color='secondaryColor' colorText="dark" icon={<GrDocumentPdf color='black' />}/></li>
        <li><BtnIcon text='ویرایش' color='white' colorText="dark" icon={<BiEdit color='black' />}/></li>
        <li><BtnIcon text='حذف' color='white' colorText="dark" icon={<BiTrash color='black' />}/></li>
        <li><CustomSwitch active='فعال' deactive='غیرفعال'/></li>
        <li><BtnIcon text='خروجی اکسل' color='white' colorText="dark" icon={<GoDesktopDownload color='black' />}/></li>
        <li><BtnIcon text="شخصی سازی" color='white' colorText="dark" icon={<GoGear color='black' />}/></li>
</ul>
    </div>
  )
}

export default OptionsTable