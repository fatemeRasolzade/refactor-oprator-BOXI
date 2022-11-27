import React from 'react'

const InputText = ({title,icon,placeHolder,setChange}:{title?:string,icon?:JSX.Element,placeHolder?:string,setChange?:any}) => {
  return (
    <div className=' w-full max-w-[80%]'>
    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
<div className="relative">
  <div className="flex absolute inset-y-0 -left-40 items-center  pointer-events-none">{icon}</div>
  <input type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300
   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5
     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
      dark:focus:border-blue-500" 
      placeholder={placeHolder}
      onChange={(e)=>setChange(e.target.value)}
      />
</div>
    </div>
  )
}

export default InputText