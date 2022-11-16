import React from 'react'
import { BiChevronLeft } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
const Breadcrumb = ({curentPage,beforePage}:{curentPage?:string,beforePage?:string}) => {
const navigate=useNavigate()

  return (
    <div className='flex justify-end items-center flex-row-reverse bg-gray-100 p-2 rounded-md'>
        <h2 className='text-xl'>{curentPage}</h2>
        <span><BiChevronLeft/></span>
        <button className='border-none' onClick={()=>navigate(-1)}><h2 className='text-xl'>{beforePage}</h2></button>
    </div>
  )
}

export default Breadcrumb