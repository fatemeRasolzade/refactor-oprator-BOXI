import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb'
import StaticTable from '../../../../components/staticTable/StaticTable'
import { HubCategoryColumn } from '../../../../global/Column/Columns'
import AddModalTable from './AddModalTable'
import NavbarTypeHub from './NavbarTypeHub'
import OptionsTableType from './OptionTableType'
import { useDispatch, useSelector } from 'react-redux';
import { clearHubType, HubTypeData } from '../../../../redux/HubData/TypeHub'
import { BiEditAlt,BiTrash } from 'react-icons/bi';


const TypeHubPage = () => {

const [active,setIsActive]=useState(false)
const dispatch=useDispatch()
const {TableType} =useSelector((state:any)=>state.HubType)
console.log('iiiiiiiiii',TableType)
useEffect(()=>{

 dispatch(HubTypeData() as any)

return()=>{
    clearHubType()
}
},[])



const datas=TableType.content && TableType.content.map((hubItem:any)=>{
    return{
        name:hubItem?.name ? hubItem?.name :"",
        code: hubItem?.code ? hubItem?.code :"",
        description: hubItem?.description ? hubItem?.description :"" ,
        id: hubItem?.id ? hubItem?.id :"" ,
        handover:<div className='flex justify-center items-center'><span className='ml-2'><BiEditAlt size={20}/></span>  <span className='ml-2'><BiTrash size={20}/></span></div>
    }
  }) 

console.log('yyyyyyyy',datas)
  return (
    <>
          <Breadcrumb beforePage="برگشت" curentPage="گونه هاب" /> 
          <NavbarTypeHub/>
            <OptionsTableType setIsActive={setIsActive}/>
            <AddModalTable open={active} handleOpen={setIsActive}/>

            <StaticTable data={datas ? datas : []} column={HubCategoryColumn}pagination={TableType?.totalElements} selectable={false}/>

    </>
  )
}

export default TypeHubPage