import { Checkbox } from '@material-tailwind/react'
import React from 'react'

const CheckboxText = ({text}:{text?:string}) => {
  return (
    <div >
        <label className='flex justify-start items-center'>
           
        <input type="checkbox" className="accent-tomato accent-emerald-500/25 p-3"/>
      <span className='mr-3'>{text}</span>
        </label>
    </div>
  )
}

export default CheckboxText