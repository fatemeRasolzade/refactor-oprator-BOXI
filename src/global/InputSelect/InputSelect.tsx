import React from 'react'
import Select from "react-select"
import { PropsSelect } from './../Interfaces/Interfaces';
const InputSelect = ({text,handelChange}:{text?:string,handelChange?:any}) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
      
      const style = {
        control: (base:any) => ({
          ...base,
          border: 0,
          // This line disable the blue border
          boxShadow: "none"
        })
      };

  return (
    <div className='w-258 h-48'>
        <fieldset className='border-white rounded-lg'>
        <legend style={{lineHeight:'0.8',marginRight:'10px'}} >{text}</legend>
        <Select
        onChange={handelChange}
        styles={style}
        options={options}
        isRtl
        placeholder=""
       className='inputSelect focus:outline-none'
        />
</fieldset>
    </div>
  )
}

export default InputSelect