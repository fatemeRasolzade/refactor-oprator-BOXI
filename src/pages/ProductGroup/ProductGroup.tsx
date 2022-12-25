import React, { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import StaticTable from '../../components/staticTable/StaticTable';
import { ProductGroupCulumn } from '../../global/Column/Columns';
import { clearProductData, ProductGroupsData } from '../../redux/ProductGroup/ProductGroup';
import Breadcrumb from './../../components/Breadcrumb/Breadcrumb';
import AddModalProductGroup from './views/AddModalProductGroup/AddModalProductGroup';
import NavbarProductGroup from './views/NavbarProductGroup/NavbarProductGroup';
import OptionTableProductGroup from './views/OptionTableProductGroup/OptionTableProductGroup';
import { BiTrash,BiEditAlt } from 'react-icons/bi';
import { ExportExcel } from '../../tools/functions/Methods';
import EditModalProductGroup from './views/EditModalProductGroup/EditModalProductGroup';
import { apiRoute } from '../../services/apiRoute';
import { DeleteWithHeader } from '../../services/Service_call';
import { ErrorAlert, SuccessAlert } from '../../global/alert/Alert';


const ProductGroup = () => {

const [showModal,setShowModal]=useState(false)
const [EditModal,setEditModal]=useState(false)
const [EditModalData,setEditModalData]=useState({})
const dispatch=useDispatch<any>()

const {pageNumbers} =useSelector((state:any)=>state.paginate)

const bodyProduct={
  code: "",
  name: "",
  description: "",
  isActive: true,
  pageNumbers:pageNumbers
}


React.useEffect(()=>{
dispatch(ProductGroupsData(bodyProduct) as any)

return()=>{
  dispatch(clearProductData())
}
},[])

React.useEffect(()=>{
  dispatch(ProductGroupsData(bodyProduct) as any)
  },[pageNumbers])

  const {ProductLists}=useSelector((state:any)=>state.productG)

  const ProductData=ProductLists.content?.length > 0 && ProductLists.content.map((item:any)=>{
    return{
      id:item.id ? item.id : "",
      code:item.code ? item?.code : "",
       name:item.name ? item?.name : "",
       discription:"ertertert",
       isActive:item?.isActive===true ? "فعال" : "غیرفعال",
      // discription:item?.discription ? item.discription : "",
      actionProduct:<div className='flex justify-center items-center gap-2'><span className='cursor-pointer' ><BiEditAlt size={20} onClick={()=>{
        setEditModalData(item)
        setEditModal(prev=>!prev)
       }}/></span> <span  className='cursor-pointer' onClick={()=>{
        DeleteWithHeader(apiRoute().post.Product_Group + `/${item.id}`).then(res=>{
          if(res.status==="OK"){
            SuccessAlert("با موفقیت پاک شد")
            dispatch(ProductGroupsData(bodyProduct) as any)
          }else{ ErrorAlert("با خطا مواجه شد")}
         
        })
      }}><BiTrash size={20}/></span></div>
    }
  })



  return (
    <>
 <Breadcrumb beforePage="اطلاعات پایه" curentPage="تعریف گروه محصول" />
<NavbarProductGroup/>
<OptionTableProductGroup addGroup={()=>setShowModal(prev=>!prev)} ExportExcel={()=>ExportExcel(ProductData)}/>
<AddModalProductGroup isModalOpen={showModal} setIsModalOpen={()=>setShowModal(prev=>!prev)} bodyProduct={bodyProduct}/>
<EditModalProductGroup isModalOpen={EditModal} setIsModalOpen={setEditModal} dataInput={EditModalData} bodyProduct={bodyProduct}/>
 <StaticTable column={ProductGroupCulumn} data={ProductData ? ProductData : []} pagination={ProductLists?.totalElements && ProductLists?.totalElements} selectable={false}/> 

    </>
  )
}

export default ProductGroup