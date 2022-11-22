import { useState,useEffect,useRef } from 'react';
import InputText from './../../global/InputText/InputText';
import Select from "react-select"
import {

  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { BiChevronDown } from 'react-icons/bi';
const PerfesionalSearch = ({LeftIcon,text}:{LeftIcon?:JSX.Element,text?:string}) => {
   

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
        <Button className='border-none bg-transparent text-dark shadow-none flex justify-around items-center text-xs'>جستجوی پیشرفته <span className='mr-5'><BiChevronDown/></span><span></span></Button>
      </PopoverHandler>
      <PopoverContent>
      <div className=" bg-white  shadow-lg rounded-md p-5 z-10" style={{width:"550px"}}>
       <div className='flex flex-wrap justify-between items-center gap-4'>
        <div><InputText/></div>
        <div> <Select className='simple_select' data-before="text"/></div>
        <div> <Select className='simple_select'/></div>
        <div> <Select className='simple_select'/></div>
       </div>
      </div>
      </PopoverContent>
    </Popover>
   
  </div>
  )
}

export default PerfesionalSearch