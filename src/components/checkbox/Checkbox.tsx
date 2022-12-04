import React from 'react'

const Checkbox = ({title,handleChange,name,blure,values}:{title?:string,handleChange?:React.ChangeEventHandler<HTMLInputElement> | undefined,name?:string,blure?:React.FocusEventHandler<HTMLInputElement>,values?:boolean}) => {
  return (
    <div>
        <label>
            <span className='block '>{title}</span>
        <input type="checkbox" className="accent-pink-500 mt-4" onChange={handleChange} name={name} onBlur={blure} checked={values}/>
        </label>
    </div>
  )
}

export default Checkbox