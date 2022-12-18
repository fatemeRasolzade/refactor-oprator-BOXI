import React, { useState } from 'react'
import Breadcrumb from './../../components/Breadcrumb/Breadcrumb';
import AddModalProductGroup from './views/AddModalProductGroup/AddModalProductGroup';
import NavbarProductGroup from './views/NavbarProductGroup/NavbarProductGroup';
import OptionTableProductGroup from './views/OptionTableProductGroup/OptionTableProductGroup';

const ProductGroup = () => {

const [showModal,setShowModal]=useState(false)

  return (
    <div>
 <Breadcrumb beforePage="اطلاعات پایه" curentPage="تعریف گروه محصول" />
<NavbarProductGroup/>
<OptionTableProductGroup addGroup={()=>setShowModal(prev=>!prev)}/>
<AddModalProductGroup isModalOpen={showModal} setIsModalOpen={()=>setShowModal(prev=>!prev)}/>


    </div>
  )
}

export default ProductGroup