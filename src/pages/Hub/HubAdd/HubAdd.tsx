import React from 'react'
import { BiSearch } from 'react-icons/bi'
import DatePickers from '../../../global/DatePicker/DatePicker'
import InputText from '../../../global/Input/Input'
import InputSelect from '../../../global/InputSelect/InputSelect'
import InputSelectIcon from '../../../global/InputSelectIcon/InputSelectIcon'

const HubAdd = () => {
  return (
    <div className='w-11/12 grid grid-cols-5 gap-4 Max-md:grid-cols-2 Max-sm:grid-cols-1 Max-xs:grid-cols-1 Max-lg:grid-cols-3'>
<InputText title='کدهاب'/>
<InputText title='نام هاب'/>
<InputSelect text='نوع هاب'/>
<InputSelect text='گونه هاب'/>
<InputSelect text='هاب والد'/>
<InputText title='پین کد' icon={<BiSearch size={20}/>}/>
<DatePickers title='تاریخ شروع فعالیت'/>

    </div>
  )
  
}

export default HubAdd