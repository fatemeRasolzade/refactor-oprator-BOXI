import { Chip } from '@material-tailwind/react';
import React, { useState } from 'react'
import { BiMoveVertical } from 'react-icons/bi';

const ChipIcon = ({text}:{text?:string | undefined}) => {
    const [show, setShow] = useState(true);
  return (
    <>
<Chip

        className='bg-gray-100 text-dark w-full  my-1 chips'
        show={show}
       
      
        animate={{
          mount: { y: 0 },
          unmount: { y:50 },
        }}
        dismissible={{
          onClose: () => setShow(false),
        }}
        value={`${text}`}
       
      />
    </>
  )
}

export default ChipIcon