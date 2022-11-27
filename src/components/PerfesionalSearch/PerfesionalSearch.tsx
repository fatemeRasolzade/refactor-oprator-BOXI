import { useState } from 'react';
import InputText from './../../global/InputText/InputText';
import Select from "react-select"
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

import { BiChevronDown ,BiXCircle} from 'react-icons/bi';
import { BiCog,BiSearch } from "react-icons/bi";
import CustomizeModal from './CustomizeModal';
import SimpleButton from '../../global/SimpleButton/SimpleButton';
const PerfesionalSearch = ({LeftIcon,text}:{LeftIcon?:JSX.Element,text?:string}) => {
   
const [costomizeModal,setCostomizeModal]=useState(false)
const handelClick=()=>{
  setCostomizeModal(prev=>!prev)
}


  return (
    <div className="w-160 relative">

<Popover
placement="bottom"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <PopoverHandler>
        <Button className='border-none bg-transparent text-dark shadow-none flex justify-around items-center'>جستجوی پیشرفته <span className='mr-5'><BiChevronDown/></span><span></span></Button>
      </PopoverHandler>
      <PopoverContent>
      <div className=" " style={{width:"550px"}}>
       <div className='flex flex-wrap justify-between items-center gap-4'>
        <div><InputText/></div>
        <div> <Select className='simple_select' data-before="text"/></div>
        <div> <Select className='simple_select'/></div>
        <div> <Select className='simple_select'/></div>
       </div>



       <div className='flex justify-between items-center mt-5'>
       <SimpleButton text='شخصی سازی' icon={<BiCog color='gray'/>} handelClick={handelClick}/>
       <SimpleButton text='پاک کردن ورودی ها'/>
       <SimpleButton className='full-tomato-btn' text='جستجو'/>

       </div>
      </div>
      </PopoverContent>
    </Popover>




    {/* costom modal  */}
    <Dialog open={costomizeModal} handler={()=>setCostomizeModal(prev=>!prev)}>
        <DialogHeader>
          <div className='flex justify-between items-center w-full'>
          <span className='text-16'>شخصی سازی</span>
            <button className='border-none focus:border-none' onClick={()=>setCostomizeModal(prev=>!prev)}><BiXCircle/></button>
           </div>
        </DialogHeader>
        <DialogBody divider>
          {/* costomize modal */}
         <CustomizeModal/>
        </DialogBody>
        <DialogFooter>
          <Button
           
            onClick={()=>setCostomizeModal(prev=>!prev)}
            className="ml-3 bg-secondaryColor text-dark border-none"
          >
            <span>لغو</span>
          </Button>
          <Button className='bg-tomato border-none'  onClick={()=>setCostomizeModal(prev=>!prev)}>
            <span>ذخیره</span>
          </Button>
        </DialogFooter>
      </Dialog>
   {/*end costom modal  */}
  </div>
  )
}

export default PerfesionalSearch