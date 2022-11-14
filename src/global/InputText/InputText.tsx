import React from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import {PropsInput} from "../../global/Interfaces/Interfaces"


const InputText = ({handelChange,text,handelSubmit}:PropsInput) => {
  return (
    <div>
        <form onSubmit={handelSubmit}>
<div className='relative w-258 h-48'>
  <span className='absolute right-10 -top-10 z-5 text-md bg-white px-2'>{text && text}</span>
    <span className='absolute -left-9 top-3 bg-white h-73 w-30 rounded-lg flex justify-center items-center'><BiSearchAlt2 size={20}/></span>
<input type="text" className='w-258 h-38 rounded-lg border-lightGray border-1 pr-2 ' onChange={(e)=>handelChange(e.target.value)} placeholder="جستجو"/>
</div>
</form>
    </div>
  )
}

export default InputText