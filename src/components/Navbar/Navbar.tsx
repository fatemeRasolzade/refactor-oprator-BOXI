
import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import Search from './Search/Search';
import { BiMenu } from "react-icons/bi";
import DrawerMobile from './../Drawer/Drawer';
import { Link } from 'react-router-dom';

const Navbar = ()=> {

const [drawerShow,setDrawerShow]=useState(false)

  return (
    <div className="h-87 flex  justify-between items-center shadow-sm  w-full bg-gray-400">
      
			<div className='hidden sm:block '></div>
      <div className='hidden Max-sm:block Max-sm:w-40% mr-5'><button className='border-none' onClick={()=>setDrawerShow(before=>!before)}><BiMenu className='text-white' size={27}/></button></div>
      <div className='Max-sm:w-40% w-30%'><Link to="/"><img src={require("../../assets/images/Boxi-3.png")} alt="logo" className='pr-5'/></Link></div>
           
             <div className='w-40% Max-sm:hidden'><Search/></div> 
         <div className='Max-sm:w-30% h-2/2 flex justify-center items-center Max-sm:justify-between w-30%'>
           
             <Avatar/>
          </div>

    {/* drawer for mobile */}
          <DrawerMobile show={drawerShow} setShow={setDrawerShow}/>
</div>
  )
}

export default Navbar