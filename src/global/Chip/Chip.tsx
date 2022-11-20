import React, { useState } from 'react'
import { BiXCircle } from 'react-icons/bi'

const Chip = ({handelDelete,title,value}:{title?:string,value?:string,handelDelete?: any}) => {



   const [show,setShow]=useState(true)

const handelClick=()=>{
    setShow(before=>!before)
}


  return (
    <>
    {show ? (
        <div className='bg-grayLight flex w-fit py-1 px-3 justify-between items-center rounded-md'>
        <span>{`${title} :`}  {value}</span>
        <span className='mr-2 cursor-pointer' onClick={()=>{handelClick();handelDelete()}}><BiXCircle/></span>


    </div>
    ): null}
   </>
  )
}

export default Chip