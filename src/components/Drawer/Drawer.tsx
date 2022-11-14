import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { PropState } from '../../global/Interfaces/Interfaces'
const DrawerMobile = ({show,setShow}:PropState) => {
  return (
    <div>
        <Drawer
        style={{zIndex:"2000"}}
                open={show}
                onClose={()=>setShow(!show)}
                direction='right'
               
            >
                <div>Hello World</div>
            </Drawer>
    </div>
  )
}

export default DrawerMobile