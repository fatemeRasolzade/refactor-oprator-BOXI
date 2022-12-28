import  { useEffect, useState } from 'react'
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb'
import StaticTable from '../../../../components/staticTable/StaticTable'
import { HubCategoryColumn } from '../../../../global/Column/Columns'
import AddModalTable from './AddModalTable'
import NavbarTypeHub from './NavbarTypeHub'
import OptionsTableType from './OptionTableType'
import { useDispatch, useSelector } from 'react-redux';
import { clearHubType, HubTypeData } from '../../../../redux/HubData/TypeHub'
import { BiEditAlt,BiTrash } from 'react-icons/bi';
import { DeleteWithHeader } from '../../../../services/Service_call'
import { apiRoute } from './../../../../services/apiRoute';
import { ErrorAlert, SuccessAlert } from '../../../../global/alert/Alert'
import { ExportExcel } from '../../../../tools/functions/Methods'
import EditModalTypeHub from './EditModalTypeHub'


const TypeHubPage = () => {

const [active,setIsActive]=useState(false)

const dispatch=useDispatch()
const {TableType} =useSelector((state:any)=>state.HubType)
const {pageNumbers} =useSelector((state:any)=>state.paginate)
const [dataEdit,setDataEdit]=useState([])
const [EditModal,setEditModal]=useState(false)

const BodyData={
  code:"",
  name:"",
  description:"",
  pageNumbers:pageNumbers
}


useEffect(()=>{
 dispatch(HubTypeData(BodyData) as any)
return()=>{
    clearHubType()
}
},[])

useEffect(()=>{
  dispatch(HubTypeData(BodyData) as any)
},[pageNumbers])


const handelDelete=(number:number)=>{
  DeleteWithHeader(apiRoute().post.Type_Hub_table + `/${number}`).then(res=>{
    if(res.status==='OK'){
    SuccessAlert("با موفقیت پاک شد")
    dispatch(HubTypeData(BodyData) as any)
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
        handover:<div className='flex justify-center items-center'><span className='ml-2 cursor-pointer' onClick={()=>{
          setDataEdit(hubItem)
         setEditModal(prev=>!prev)
      }}><BiEditAlt size={20}/></span>  <span className='ml-2 cursor-pointer' onClick={()=>handelDelete(hubItem?.id)}><BiTrash size={20}/></span></div>
    }
  }) 


  return (
    <>
          <Breadcrumb beforePage="برگشت" curentPage="گونه هاب" /> 
          <NavbarTypeHub/>
            <OptionsTableType setIsActive={setIsActive} exportExcel={()=>ExportExcel(TableType.content)}/>
            <AddModalTable open={active} handleOpen={setIsActive}/>
            <EditModalTypeHub  open={EditModal} handleOpen={setEditModal} dataEdit={dataEdit}/>
            <StaticTable data={datas ? datas : []} column={HubCategoryColumn}pagination={TableType?.totalElements} selectable={false}/>

    </>
  )
}

export default TypeHubPage