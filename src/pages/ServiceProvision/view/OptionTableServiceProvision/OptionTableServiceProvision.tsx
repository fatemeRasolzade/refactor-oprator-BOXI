import React, { useState } from 'react'
import AddButton from '../../../../global/addButton/AddButton'
import SimpleButton from '../../../../global/SimpleButton/SimpleButton';
import { GoDesktopDownload } from 'react-icons/go';
import AddModalService from '../AddModalService/AddModalService';

const OptionTableServiceProvision = ({exportExcel}:{exportExcel?:React.MouseEventHandler<HTMLButtonElement>}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

const handleAction=()=>setIsModalOpen(prev=>!prev)
  


const handleUploadFileAction=()=>{
    
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

      <AddModalService setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
</div>
  )
}

export default OptionTableServiceProvision