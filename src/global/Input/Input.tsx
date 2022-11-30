import React from 'react'

const InputText = ({title,placeHolder,handelChange,name,props,blure,values,important,type}:{title?:string,icon?:JSX.Element,placeHolder?:string,handelChange?:React.ChangeEventHandler<HTMLInputElement>,name?:string,id?:string,props?:any,blure?:React.FocusEventHandler<HTMLInputElement>,values?: any,important?:boolean,type?:string}) => {
  return (
    <div className='w-full'>
    <label htmlFor="email-address-icon" className="block  text-sm font-medium text-gray-900 dark:text-white">{title} {important && <span className='text-tomato'>*</span>} </label>
<div className="relative">
  {/* <div className="flex absolute inset-y-0 -left-40 items-center  pointer-events-none">{icon}</div> */}
  <input type={type} id={name} className="bg-gray-50 border border-gray-300
   text-gray-900 text-sm rounded-lg w-[-webkit-fill-available] focus:border-blue-500 block pl-10 p-2.5
     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
      dark:focus:border-blue-500" 
      placeholder={placeHolder}
      onChange={handelChange}
      name={name}
      {...props} 
      onBlur={blure}
      value={values}
      />
</div>
    </div>
  )
}

export default InputText