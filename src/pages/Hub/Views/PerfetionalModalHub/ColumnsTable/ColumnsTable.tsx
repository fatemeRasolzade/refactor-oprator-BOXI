import { Chip } from '@material-tailwind/react';
import React, { useState } from 'react'
import ChipIcon from '../../../../../global/ChipIcon/ChipIcon';
import InputIcon from '../../../../../global/InputIcon/InputIcon'
import Checkbox from './../../../../../components/checkbox/Checkbox';


const ColumnsTable = () => {


const item=["عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون","عنوان ستون"]



  return (
    <div>
        <h4>.در اینجا می توانید بر اساس نیاز خود ، انتخاب کنید که کدام یک از ستون های جدول نمایش داده شوند
.با کلیک بر روی فلش های ستون های انتخاب شده ، میتوانید ترتیب ستون های جدول را تغییر دهید</h4>

<div className='w-full flex justify-center items-start mt-4'>

<div className='flex-1 max-h-[300px] overflow-auto p-3'>
<h4 className='mb-4'>تمام ستون ها</h4>
<InputIcon text='جستجو' />
<div className='mt-3'>
    {
        item.map((items,index)=>{
            return(
                <React.Fragment key={index}>
                <Checkbox title={items}/>
                </React.Fragment>
            )
        })
    }

</div>
</div>
<div className='flex-1 max-h-[300px] overflow-auto p-3'>
<h4 className='mb-4'>ستون های انتخاب شده</h4>
<InputIcon text='جستجو'/>
<div className='mt-3'>
{
    item.map((items,index)=>{
        return(
            <React.Fragment key={index}>
            <ChipIcon text={items}/>
            </React.Fragment>
        )
    })
}

</div>

</div>

</div>

    </div>
  )
}

export default ColumnsTable