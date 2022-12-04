import React from 'react'
import Select from "react-select"
const InputSelect = ({text,handelChange,name,blure,values,options}:{text?:string,handelChange?:any,name?:string,blure?:React.FocusEventHandler<HTMLInputElement>,values?:any,options?:any}) => {

    

      const style = {
        control: (base:any) => ({
          ...base,
          
          // This line disable the blue border
          boxShadow: "none",
          width:"100%"
        })
      };

  return (
    <div className='w-full '>
       <label >
        <span>{text}</span>
        <Select
      
        isLoading={options.length > 0 ? false : true}
        value={options ? options.find((option:any)=>option.label===values): ""}
        onChange={option => handelChange(name, {
          id:option.value,
          text:option.label
        })}
        styles={style}
        options={
             options.map((res:any)=>{
              return{
                 
                  label:res.text,
                  value:res.id,
                }
            })
          
          }
        placeholder=""
        isRtl
       name={name}
       className='inputSelect focus:outline-none'
        />
</label>
    </div>
  )
}

export default InputSelect
