import React from 'react'
import SimpleButton from '../../../../global/SimpleButton/SimpleButton'
import CustomSwitch from '../../../../global/Switch/Switch'
import { GoGear,GoDesktopDownload } from 'react-icons/go';
import { BiPlus } from 'react-icons/bi';


const OperationHub = ({exportExcel, isActive,setIsActive,setActionModal}:{exportExcel?:any,isActive?:any,setIsActive?:any,setActionModal?:any}) => {
  return (
    <div className="mt-6">
    <ul className="flex gap-4 justify-start items-center flex-wrap">
      {/* <AddButton />  */}
     
     <li>
     <SimpleButton
                text="افزودن"
                className="full-tomato-btn w-[160px] h-[40px] centering rounded-lg text-white"
                icon={<BiPlus color="white" />}
                 handelClick={()=>setActionModal((prev:any)=>!prev)}
              />
     </li>
     
      <li>
        <SimpleButton
          handelClick={exportExcel}
          text="خروجی اکسل"
          icon={<GoDesktopDownload color="black" />}
          className="centering rounded-lg text-black w-full"
        />
      </li>
      <li>
        <CustomSwitch
          active={isActive ? isActive : false}
          handleChange={(value: boolean) =>
            setIsActive && setIsActive(value as boolean)
          }
        />
      </li>
      <li>
        <SimpleButton
          text="شخصی سازی"
          icon={<GoGear color="black" />}
          className="centering rounded-lg text-black w-full"
        />
      </li>
    </ul>
  </div>
  )
}

export default OperationHub