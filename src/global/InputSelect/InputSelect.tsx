import React from 'react'
import Select from "react-select"
const InputSelect = ({text,handelChange,name,blure,values}:{text?:string,handelChange?:any,name?:string,blure?:React.FocusEventHandler<HTMLInputElement>,values?:any}) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
      

      const style = {
        control: (base:any) => ({
          ...base,
          
          // This line disable the blue border
          boxShadow: "none",
          width:"100%"
        })
      };

  return (
    <div className='w-full h-48'>
       <label >
        <span>{text}</span>
        <Select
        value={values}
        onChange={option => handelChange(name, (option as any).value)}
        onBlur={blure}
        styles={style}
        options={options}
        isRtl
        placeholder=""
        name={name}
       className='inputSelect focus:outline-none'
        />
</label>
    </div>
  )
}

export default InputSelect