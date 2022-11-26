import React from 'react'
import CheckboxText from '../../../global/CheckboxText/CheckboxText';
import InputText from '.././../../global/InputText/InputText';
import ChipIcon from '../../../global/ChipIcon/ChipIcon';
const ColumnTable = () => {
    const checkboxed=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  return (
    <div className='grid grid-cols-2 gap-4'>

    <div className='border-l border '>
      <h3 className='my-4'>تمام ستون ها</h3>
      {/* search Input */}
  <InputText/>

  {/*sample checkbox */}
  <div className='h-300 overflow-auto mt-5' dir='ltr'>
    <div dir='rtl' className='pr-5'>
     
      {
checkboxed.map(item=>{
return <CheckboxText text='فیلد اول'/>
})

      }
  </div>
  </div>
  

    </div>
{/* second column */}
    <div className=''>
    <h3 className='my-4'>ستون های انتخاب شده</h3>
    <InputText/>
    <div className='h-300 overflow-auto mt-5' dir='ltr'>
    <div dir='rtl'>
   { checkboxed.map(item=>{
    return <ChipIcon text='text'/>
    })}
  </div>
  </div>
     
    </div>
    </div>
  )
}

export default ColumnTable