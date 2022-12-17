import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb'
import StaticTable from '../../../../components/staticTable/StaticTable'
import { HubCategoryColumn } from '../../../../global/Column/Columns'
import AddModalTable from './AddModalTable'
import NavbarTypeHub from './NavbarTypeHub'
import OptionsTableType from './OptionTableType'
import { useDispatch, useSelector } from 'react-redux';
import { clearHubType, deleteTable, HubTypeData } from '../../../../redux/HubData/TypeHub'
import { BiEditAlt,BiTrash } from 'react-icons/bi';
import { DeleteWithHeader } from '../../../../services/Service_call'
import { apiRoute } from './../../../../services/apiRoute';
import { ErrorAlert, SuccessAlert } from '../../../../global/alert/Alert'
import { ExportExcel } from '../../../../tools/functions/Methods'


const TypeHubPage = () => {

const [active,setIsActive]=useState(false)
const dispatch=useDispatch()
const {TableType} =useSelector((state:any)=>state.HubType)
const {pageNumbers} =useSelector((state:any)=>state.paginate)

useEffect(()=>{
 dispatch(HubTypeData(pageNumbers) as any)
return()=>{
    clearHubType()
}
},[])

useEffect(()=>{
  dispatch(HubTypeData(pageNumbers) as any)
},[pageNumbers])


const handelDelete=(number:number)=>{
  DeleteWithHeader(apiRoute().post.Type_Hub_table + `/${number}` ,{
    headers: { Authorization: "Bearer " + localStorage.getItem("myToken") }
  }).then(res=>{
    if(res.status==='OK'){
    SuccessAlert("با موفقیت پاک شد")
    dispatch(HubTypeData(pageNumbers) as any)
    }else{
      ErrorAlert("خطا در برقراری ارتباط")
    }
  })
}


const datas=TableType.content && TableType.content.map((hubItem:any)=>{
    return{
        name:hubItem?.name ? hubItem?.name :"",
        code: hubItem?.code ? hubItem?.code :"",
        description: hubItem?.description ? hubItem?.description :"" ,
        id: hubItem?.id ? hubItem?.id :"" ,
        handover:<div className='flex justify-center items-center'><span className='ml-2 cursor-pointer'><BiEditAlt size={20}/></span>  <span className='ml-2 cursor-pointer' onClick={()=>handelDelete(hubItem?.id)}><BiTrash size={20}/></span></div>
    }
  }) 


  return (
    <>
          <Breadcrumb beforePage="برگشت" curentPage="گونه هاب" /> 
          <NavbarTypeHub/>
            <OptionsTableType setIsActive={setIsActive} exportExcel={()=>ExportExcel(TableType.content)}/>
            <AddModalTable open={active} handleOpen={setIsActive}/>

            <StaticTable data={datas ? datas : []} column={HubCategoryColumn}pagination={TableType?.totalElements} selectable={false}/>

    </>
  )
}

export default TypeHubPage