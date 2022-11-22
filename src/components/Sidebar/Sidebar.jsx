import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { links } from '../SidebarRoutes/SidebarRoutes';
import {useNavigate } from 'react-router-dom';
const Sidebar = ({setToggle}) => {
    const navigate=useNavigate()
  return (
    <div>
   <SideNav style={{right:'0',top:'0',bottom:'0',width:'70px'}} className="!bg-gray-500 focus:content-none" onSelect={(e)=>e !== undefined ? navigate(`/${e}`):navigate(`/`)}>
    <SideNav.Toggle onClick={()=>setToggle(last=>!last)}/>
    <SideNav.Nav>

      {/* <NavItem className="flex justify-center items-center mb-5 hover:!bg-gray-500">
     <img src={require('../../assets/images/Boxi-3.png')} alt="logo" />
      </NavItem>
        */}
        {
            links.map((item,index)=>{
                const {Icon,label,childs}=item
                return(
                 
                    <NavItem eventKey={label} className='focus:border-none '>
            <NavIcon>
                {Icon}
            </NavIcon>
            <NavText>{label}</NavText>
            {childs.map(({ to, label}, index) => (
           
							<NavItem key={index} eventKey={to.replace(/^\//, "")} >
								<NavText style={{ fontWeight: 500, marginRight: 10 }}>{label}</NavText>
							</NavItem>
            
              
						))}
        </NavItem> 
      
                )
            })
        }

        

    </SideNav.Nav>
</SideNav>
    </div>
  )
}

export default Sidebar