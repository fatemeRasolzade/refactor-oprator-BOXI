import React, { useState } from 'react'
import AddButton from '../../../../global/addButton/AddButton'
import SimpleButton from '../../../../global/SimpleButton/SimpleButton';
import CustomSwitch from '../../../../global/Switch/Switch';
import { GoDesktopDownload } from 'react-icons/go';
import { Dialog } from '@material-tailwind/react';
import AddModalService from '../AddModalService/AddModalService';
import { BiXCircle } from 'react-icons/bi';

const OptionTableServiceProvision = ({exportExcel}:{exportExcel?:React.MouseEventHandler<HTMLButtonElement>}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

const handleAction=()=>setIsModalOpen(prev=>!prev)
  


const handleUploadFileAction=()=>{
    console.log("second")
}
    const ToggleOptions = [
        { handleClick: handleAction, name: "افزودن محصول" },
        { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
      ];

  return (
    <div className='w-full flex-start-center flex-wrap'>
        <AddButton ToggleOptions={ToggleOptions} />
        {/* <CustomSwitch active /> */}
        <SimpleButton
          handelClick={exportExcel}
            text="خروجی اکسل"
            icon={<GoDesktopDownload color="black" />}
            className="centering rounded-lg text-black"
          />

<Dialog open={isModalOpen} handler={setIsModalOpen} className="p-5 !w-[80%] max-w-[60%] overflow-visible">
    <div className='flex-between-start'>
    <h3>ارائه سرویس</h3>
    <span className='cursor-pointer' onClick={()=>setIsModalOpen(prev=>!prev)}><BiXCircle size={20}/></span>
    </div>

   <AddModalService isModal={setIsModalOpen}/>
</Dialog>


    </div>
  )
}

export default OptionTableServiceProvision