import React from 'react'
import Breadcrumb from './../../components/Breadcrumb/Breadcrumb';
import NavbarProductGroup from './views/NavbarProductGroup/NavbarProductGroup';
import OptionTableProductGroup from './views/OptionTableProductGroup/OptionTableProductGroup';

const ProductGroup = () => {
  return (
    <div>
 <Breadcrumb beforePage="اطلاعات پایه" curentPage="تعریف گروه محصول" />
<NavbarProductGroup/>
<OptionTableProductGroup/>

    </div>
  )
}

export default ProductGroup