import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Input 
  } from "@material-tailwind/react";
import CheckboxText from '../../global/CheckboxText/CheckboxText';
import InputText from './../../global/InputText/InputText';
import ChipIcon from '../../global/ChipIcon/ChipIcon';
const CustomizeModal = () => {

  const checkboxed=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
   
  return (
    
<Tabs id="custom-animation" value="columnTable" className="w-full">
      <TabsHeader>
       
          <Tab key={1} value={"columnTable"} onClick={(e)=>console.log(e)}>ستون های جدول</Tab>
          <Tab key={2} value={"searchFilter"} onClick={(e)=>console.log(e)}>فیلترهای جستجو</Tab>
          <Tab key={3} value={"action"} onClick={(e)=>console.log(e)}>عملیات</Tab>
      </TabsHeader>
      <TabsBody
        animate={{
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
      
          <TabPanel key={1} value={"columnTable"}>
        <div className='flex justify-center items-center'>

        <div className=' flex-1 border-l-1 border'>
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
        <div className='flex-1'>
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

       </TabPanel>
          <TabPanel key={2} value={"searchFilter"}>
          wertertert
          </TabPanel>
          <TabPanel key={3} value={"action"}>
          uytyutyu
          </TabPanel>
       
      </TabsBody>
    </Tabs>
  
  )
}

export default CustomizeModal