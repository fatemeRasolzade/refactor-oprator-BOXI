import { Chip } from '@material-tailwind/react';
import React, { useState } from 'react'
import { BiMoveVertical } from 'react-icons/bi';

const ChipIcon = ({text}:{text?:string | undefined}) => {
    const [show, setShow] = useState(true);
  return (
    <>
<Chip
        variant="gradient"
        show={show}
        icon={<BiMoveVertical size={25}/>}
       color="gray"
        animate={{
          mount: { y: 0 },
          unmount: { y: 50 },
        }}
        dismissible={{
          onClose: () => setShow(false),
        }}
        value={`${text}`}
        className='chips w-[210px] my-1'
      />
    </>
  )
}

export default ChipIcon